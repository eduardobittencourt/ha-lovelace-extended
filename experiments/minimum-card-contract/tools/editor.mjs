import {base,ws} from './common.mjs';
export const dashboard='mcc-experiment';
export async function openDashboard(page, layout='sections') {
 await page.goto(`${base}/${dashboard}/${layout}`);
 await page.getByRole('button',{name:'Edit dashboard',exact:true}).waitFor();
}
export async function createVisual(page, {reload=true}={}) {
 if(reload)await openDashboard(page);
 await page.getByRole('button',{name:'Edit dashboard',exact:true}).click();
 await page.getByRole('button',{name:'Add card',exact:true}).first().click();
 await page.getByRole('tab',{name:'By card',exact:true}).click();
 await page.getByText('Minimum card contract experiment',{exact:false}).last().locator('..').locator('.overlay').click();
 await page.getByRole('textbox',{name:'Slot A label*',exact:true}).waitFor();
}
export async function openExisting(page, {reload=true}={}) {
 if(reload)await openDashboard(page);
 await page.getByRole('button',{name:'Edit dashboard',exact:true}).click();
 await page.getByRole('button',{name:'Edit card',exact:true}).last().press('Enter');
 await page.getByRole('textbox',{name:'Slot A label*',exact:true}).waitFor();
}
export async function saveVisual(page) {
 await page.getByRole('button',{name:'Save',exact:true}).click();
 await page.getByRole('button',{name:'Done',exact:true}).click();
 await page.locator('minimum-card-contract').first().waitFor();
}
export async function storedCard(page) {
 const config=await ws(page,{type:'lovelace/config',url_path:dashboard,force:true});
 return config.views[0].sections.flatMap(section=>section.cards).find(card=>card.type==='custom:minimum-card-contract');
}
