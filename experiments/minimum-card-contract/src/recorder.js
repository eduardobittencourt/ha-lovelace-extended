/* Experiment-only local intent sink. No service invocation or device dispatch. */
(() => {
  if (globalThis.mccRecorder) return;
  const allowed = Object.freeze(['input_boolean.mcc_target_a', 'input_boolean.mcc_target_b', 'input_boolean.mcc_target_body']);
  const events = [];
  const recorder = {
    events,
    nextOutcome: 'record',
    reset() { events.length = 0; this.nextOutcome = 'record'; },
    record(target, {confirm = false, origin = 'experimental'} = {}) {
      const outcome = this.nextOutcome;
      this.nextOutcome = 'record';
      if (!allowed.includes(target) || outcome === 'reject') return {status:'rejected'};
      if (outcome === 'cancel' || (confirm && !globalThis.confirm('Record this synthetic intent? No device command is sent.'))) return {status:'cancelled'};
      const intent = Object.freeze({target, origin, time:performance.now()});
      events.push(intent);
      return {status:'recorded'};
    },
  };
  Object.defineProperty(globalThis, 'mccRecorder', {value:recorder});
  // Test-driver opt-in. Normal experimental loads never replace WebSocket.send.
  if (!globalThis.__MCC_INTERCEPT_NATIVE__) return;
  const fetch = globalThis.fetch;
  globalThis.fetch = function(input, options) {
    const url = new URL(typeof input === 'string' || input instanceof URL ? input : input.url, location.href);
    if (url.pathname.startsWith('/api/services/')) return Promise.reject(new Error('Experiment blocks REST services'));
    return fetch.call(this, input, options);
  };
  const open = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method, url, ...rest) {
    if (new URL(url, location.href).pathname.startsWith('/api/services/')) throw new Error('Experiment blocks REST services');
    return open.call(this, method, url, ...rest);
  };
  const original = WebSocket.prototype.send;
  WebSocket.prototype.send = function (data) {
    let message;
    try { message = JSON.parse(data); } catch { return original.call(this, data); }
    if (message.type !== 'call_service') return original.call(this, data);
    const targets = message.target?.entity_id ?? message.service_data?.entity_id;
    const target = Array.isArray(targets) && targets.length === 1 ? targets[0] : targets;
    const outcome = message.domain === 'input_boolean' && ['toggle', 'turn_on', 'turn_off'].includes(message.service)
      ? recorder.record(target, {origin:'native'}) : {status:'rejected'};
    const response = outcome.status === 'recorded'
      ? {id:message.id,type:'result',success:true,result:{context:{id:'intercepted',parent_id:null,user_id:null}}}
      : {id:message.id,type:'result',success:false,error:{code:'experiment_rejected',message:outcome.status}};
    queueMicrotask(() => this.dispatchEvent(new MessageEvent('message', {data:JSON.stringify(response)})));
    // Deliberately never call the original transport for any call_service.
  };
})();
