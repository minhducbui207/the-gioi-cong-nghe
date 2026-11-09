// THẾ GIỚI CÔNG NGHỆ - FILE 3: script.js - ĐÃ SỬA LỖI DÒNG CUỐI
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playSound(type){
  if(!audioCtx) return; if(audioCtx.state==='suspended') audioCtx.resume();
  const o=audioCtx.createOscillator(); const g=audioCtx.createGain(); o.connect(g); g.connect(audioCtx.destination);
  if(type==='cash'){o.type='sine';o.frequency.setValueAtTime(523.25,audioCtx.currentTime);o.frequency.exponentialRampToValueAtTime(1046.5,audioCtx.currentTime+0.15);g.gain.setValueAtTime(0.15,audioCtx.currentTime);g.gain.exponentialRampToValueAtTime(0.01,audioCtx.currentTime+0.3);o.start();o.stop(audioCtx.currentTime+0.3);}
  else if(type==='buy'){o.type='triangle';o.frequency.setValueAtTime(300,audioCtx.currentTime);o.frequency.exponentialRampToValueAtTime(600,audioCtx.currentTime+0.1);g.gain.setValueAtTime(0.1,audioCtx.currentTime);g.gain.exponentialRampToValueAtTime(0.01,audioCtx.currentTime+0.15);o.start();o.stop(audioCtx.currentTime+0.15);}
  else if(type==='upgrade'){o.type='sine';o.frequency.setValueAtTime(440,audioCtx.currentTime);o.frequency.setValueAtTime(554.37,audioCtx.currentTime+0.1);o.frequency.setValueAtTime(659.25,audioCtx.currentTime+0.2);g.gain.setValueAtTime(0.15,audioCtx.currentTime);g.gain.exponentialRampToValueAtTime(0.01,audioCtx.currentTime+0.35);o.start();o.stop(audioCtx.currentTime+0.35);}
  else if(type==='error'){o.type='sawtooth';o.frequency.setValueAtTime(150,audioCtx.currentTime);o.frequency.linearRampToValueAtTime(100,audioCtx.currentTime+0.2);g.gain.setValueAtTime(0.2,audioCtx.currentTime);g.gain.exponentialRampToValueAtTime(0.01,audioCtx.currentTime+0.2);o.start();o.stop(audioCtx.currentTime+0.2);}
}
function formatVND(a){ if(a>=1000000000) return (a/1000000000).toFixed(1)+' tỷ đ'; if(a>=1000000) return (a/1000000).toFixed(0)+' Tr đ'; return new Intl.NumberFormat('vi-VN',{style:'currency',currency:'VND'}).format(a).replace('₫','đ'); }

// HỘP THOẠI TRONG GAME - THAY alert()
function showGameDialog(msg, title, onOk){
  const m=document.getElementById('gameDialogModal'); document.getElementById('gameDialogTitle').innerText=title||'Thông báo'; document.getElementById('gameDialogMsg').innerText=msg;
  const box=document.getElementById('gameDialogActions'); box.innerHTML='';
  const ok=document.createElement('button'); ok.className='btn-dialog-ok'; ok.innerText='Đã hiểu'; ok.onclick=()=>{ m.classList.add('hidden'); if(onOk) onOk(); };
  box.appendChild(ok); m.classList.remove('hidden');
}
function showConfirmDialog(msg, title, onConfirm){
  const m=document.getElementById('gameDialogModal'); document.getElementById('gameDialogTitle').innerText=title||'Xác nhận'; document.getElementById('gameDialogMsg').innerText=msg;
  const box=document.getElementById('gameDialogActions'); box.innerHTML='';
  const cancel=document.createElement('button'); cancel.className='btn-dialog-cancel'; cancel.innerText='Hủy'; cancel.onclick=()=>m.classList.add('hidden');
  const ok=document.createElement('button'); ok.className='btn-dialog-ok'; ok.innerText='Đồng ý'; ok.onclick=()=>{ m.classList.add('hidden'); if(onConfirm) onConfirm(); };
  box.appendChild(cancel); box.appendChild(ok); m.classList.remove('hidden');
}

const provincesList=[
 {name:"Hà Nội",desc:"Thủ đô sức mua lớn",priceM2:350000,advX:2.20},
 {name:"Hải Phòng",desc:"Thành phố cảng công nghiệp",priceM2:220000,advX:2.00},
 {name:"TP. Hồ Chí Minh",desc:"Trung tâm kinh tế lớn nhất",priceM2:400000,advX:2.50},
 {name:"Đà Nẵng",desc:"Đô thị du lịch miền Trung",priceM2:250000,advX:1.90},
 {name:"Cần Thơ",desc:"Thủ phủ miền Tây",priceM2:180000,advX:1.70},
 {name:"An Giang",desc:"Vùng biên mậu sầm uất",priceM2:130000,advX:1.30},
 {name:"Bà Rịa - Vũng Tàu",desc:"Trung tâm dầu khí du lịch",priceM2:210000,advX:1.80},
 {name:"Bắc Giang",desc:"Tâm điểm công nghệ miền Bắc",priceM2:160000,advX:1.60},
 {name:"Bắc Kạn",desc:"Vùng núi cao kinh tế nhỏ",priceM2:90000,advX:0.90},
 {name:"Bạc Liêu",desc:"Xứ sở thương mại miền Tây",priceM2:120000,advX:1.20},
 {name:"Bắc Ninh",desc:"Thủ phủ FDI công nghiệp",priceM2:190000,advX:1.85},
 {name:"Bến Tre",desc:"Xứ dừa phát triển thương mại",priceM2:125000,advX:1.25},
 {name:"Bình Định",desc:"Trung tâm Nam Trung Bộ",priceM2:150000,advX:1.40},
 {name:"Bình Dương",desc:"Thủ phủ công nghiệp phía Nam",priceM2:260000,advX:2.10},
 {name:"Bình Phước",desc:"Cửa ngõ biên giới phía Nam",priceM2:130000,advX:1.30},
 {name:"Bình Thuận",desc:"Du lịch biển & năng lượng",priceM2:140000,advX:1.35},
 {name:"Cà Mau",desc:"Đất mũi cực Nam",priceM2:115000,advX:1.15},
 {name:"Cao Bằng",desc:"Vùng cao biên giới",priceM2:95000,advX:0.95},
 {name:"Đắk Lắk",desc:"Thủ phủ Tây Nguyên",priceM2:155000,advX:1.45},
 {name:"Đắk Nông",desc:"Cao nguyên thương mại",priceM2:110000,advX:1.10},
 {name:"Điện Biên",desc:"Vùng lịch sử Tây Bắc",priceM2:100000,advX:1.00},
 {name:"Đồng Nai",desc:"Trung tâm logistics công nghiệp",priceM2:240000,advX:2.00},
 {name:"Đồng Tháp",desc:"Đất sen hồng thương mại",priceM2:120000,advX:1.20},
 {name:"Gia Lai",desc:"Phố núi Tây Nguyên",priceM2:135000,advX:1.30},
 {name:"Hà Giang",desc:"Địa đầu cực Bắc",priceM2:85000,advX:0.85},
 {name:"Hà Nam",desc:"Công nghiệp và dịch vụ",priceM2:145000,advX:1.35},
 {name:"Hà Tĩnh",desc:"Khu kinh tế Vũng Áng",priceM2:140000,advX:1.30},
 {name:"Hải Dương",desc:"Vùng kinh tế trọng điểm",priceM2:165000,advX:1.50},
 {name:"Hậu Giang",desc:"Tiểu vùng sông Hậu",priceM2:110000,advX:1.10},
 {name:"Hòa Bình",desc:"Cửa ngõ Tây Bắc",priceM2:135000,advX:1.25},
 {name:"Hưng Yên",desc:"Đô thị hóa công nghiệp mạnh",priceM2:175000,advX:1.55},
 {name:"Khánh Hòa",desc:"Du lịch Nha Trang sầm uất",priceM2:230000,advX:1.95},
 {name:"Kiên Giang",desc:"Phú Quốc & đô thị biển",priceM2:190000,advX:1.70},
 {name:"Kon Tum",desc:"Cao nguyên xanh",priceM2:105000,advX:1.05},
 {name:"Lai Châu",desc:"Vùng cao phía Tây",priceM2:90000,advX:0.90},
 {name:"Lâm Đồng",desc:"Đà Lạt dịch vụ du lịch",priceM2:185000,advX:1.65},
 {name:"Lạng Sơn",desc:"Cửa ngõ thương mại quốc tế",priceM2:150000,advX:1.40},
 {name:"Lào Cai",desc:"Sapa & thương mại biên giới",priceM2:170000,advX:1.55},
 {name:"Long An",desc:"Vành đai giáp TP.HCM",priceM2:180000,advX:1.60},
 {name:"Nam Định",desc:"Thương mại truyền thống",priceM2:150000,advX:1.35},
 {name:"Nghệ An",desc:"Trung tâm Bắc Trung Bộ",priceM2:195000,advX:1.75},
 {name:"Ninh Bình",desc:"Du lịch di sản toàn cầu",priceM2:160000,advX:1.45},
 {name:"Ninh Thuận",desc:"Năng lượng & thương mại",priceM2:120000,advX:1.20},
 {name:"Phú Thọ",desc:"Đất tổ vua Hùng",priceM2:145000,advX:1.35},
 {name:"Phú Yên",desc:"Xứ hoa vàng cỏ xanh",priceM2:130000,advX:1.25},
 {name:"Quảng Bình",desc:"Du lịch hang động",priceM2:135000,advX:1.30},
 {name:"Quảng Nam",desc:"Di sản Hội An",priceM2:170000,advX:1.55},
 {name:"Quảng Ngãi",desc:"Khu kinh tế Dung Quất",priceM2:155000,advX:1.40},
 {name:"Quảng Ninh",desc:"Hạ Long & kinh tế biển",priceM2:240000,advX:2.05},
 {name:"Quảng Trị",desc:"Vùng đất lịch sử",priceM2:120000,advX:1.15},
 {name:"Sóc Trăng",desc:"Văn hóa miền Tây",priceM2:115000,advX:1.15},
 {name:"Sơn La",desc:"Trung tâm Tây Bắc",priceM2:130000,advX:1.25},
 {name:"Tây Ninh",desc:"Giao thương biên giới",priceM2:140000,advX:1.35},
 {name:"Thái Bình",desc:"Quê hương lúa vàng",priceM2:145000,advX:1.35},
 {name:"Thái Nguyên",desc:"Thủ phủ công nghệ",priceM2:180000,advX:1.60},
 {name:"Thanh Hóa",desc:"Cực tăng trưởng lớn miền Bắc",priceM2:200000,advX:1.80},
 {name:"Thừa Thiên Huế",desc:"Thành phố di sản",priceM2:175000,advX:1.50},
 {name:"Tiền Giang",desc:"Cửa ngõ miền Tây",priceM2:160000,advX:1.45},
 {name:"Trà Vinh",desc:"Đô thị thương mại xanh",priceM2:120000,advX:1.20},
 {name:"Tuyên Quang",desc:"Vùng chiến khu",priceM2:110000,advX:1.10},
 {name:"Vĩnh Long",desc:"Đồng bằng sông Cửu Long",priceM2:135000,advX:1.30},
 {name:"Vĩnh Phúc",desc:"Công nghiệp ô tô xe máy",priceM2:185000,advX:1.65},
 {name:"Yên Bái",desc:"Kinh tế Tây Bắc",priceM2:125000,advX:1.20}
];
const masterProductsList=[
{id:'p1',category:'Laptop',brand:'Ap'+'ple',name:'MacBook Pro M3 14 inch',segment:'Cao cấp',cost:35000000,price:44000000,stock:0},
{id:'p2',category:'Laptop',brand:'AS'+'US',name:'AS'+'US ROG Strix Gaming G16',segment:'Cao cấp',cost:28000000,price:35000000,stock:0},
{id:'p3',category:'Laptop',brand:'De'+'ll',name:'De'+'ll XPS 13 9315',segment:'Cao cấp',cost:26000000,price:32500000,stock:0},
{id:'p4',category:'Laptop',brand:'H'+'P',name:'H'+'P Pavilion 15 Eg',segment:'Trung cấp',cost:14500000,price:18500000,stock:0},
{id:'p5',category:'Laptop',brand:'Le'+'novo',name:'Le'+'novo ThinkPad X1 Carbon',segment:'Cao cấp',cost:31000000,price:39000000,stock:0},
{id:'p6',category:'Máy tính bảng',brand:'Ap'+'ple',name:'iPad Air M2 11 inch',segment:'Cao cấp',cost:15500000,price:19500000,stock:0},
{id:'p7',category:'Máy tính bảng',brand:'Sa'+'msung',name:'Ga'+'laxy Tab S9 FE',segment:'Trung cấp',cost:9500000,price:12500000,stock:0},
{id:'p8',category:'Đồng hồ',brand:'Ap'+'ple',name:'Ap'+'ple Watch Series 9 45mm',segment:'Cao cấp',cost:8500000,price:11500000,stock:0},
{id:'p9',category:'Đồng hồ',brand:'Sa'+'msung',name:'Ga'+'laxy Watch 6 Classic',segment:'Trung cấp',cost:6200000,price:8500000,stock:0},
{id:'p10',category:'Tai nghe',brand:'So'+'ny',name:'Tai nghe So'+'ny WH-1000XM5',segment:'Cao cấp',cost:6000000,price:8200000,stock:0},
{id:'p11',category:'Tai nghe',brand:'Ap'+'ple',name:'AirPods Pro 2 USB-C',segment:'Cao cấp',cost:4800000,price:6200000,stock:0},
{id:'p12',category:'Loa',brand:'J'+'BL',name:'Loa J'+'BL Flip 6',segment:'Trung cấp',cost:2200000,price:3200000,stock:0},
{id:'p13',category:'Loa',brand:'So'+'ny',name:'Loa So'+'ny SRS-XE300',segment:'Trung cấp',cost:3500000,price:4800000,stock:0},
{id:'p14',category:'Phụ kiện',brand:'An'+'ker',name:'Sạc nhanh An'+'ker 65W GaN',segment:'Trung cấp',cost:600000,price:950000,stock:0},
{id:'p15',category:'Phụ kiện',brand:'Logi'+'tech',name:'Chuột Logi'+'tech MX Master 3S',segment:'Trung cấp',cost:1800000,price:2500000,stock:0},
{id:'p16',category:'Phụ kiện',brand:'Logi'+'tech',name:'Bàn phím Logi'+'tech MX Keys',segment:'Trung cấp',cost:2100000,price:2900000,stock:0},
{id:'p17',category:'Phụ kiện',brand:'Be'+'lkin',name:'Cáp Be'+'lkin USB-C 100W 2m',segment:'Phổ thông',cost:350000,price:550000,stock:0},
{id:'p18',category:'TV',brand:'Sa'+'msung',name:'TV Sa'+'msung QLED 55 inch 4K',segment:'Cao cấp',cost:13500000,price:17500000,stock:0},
{id:'p19',category:'TV',brand:'L'+'G',name:'L'+'G OLED 55 inch C3',segment:'Cao cấp',cost:22000000,price:28500000,stock:0},
{id:'p20',category:'TV',brand:'TC'+'L',name:'TV TC'+'L QLED 65 inch 4K',segment:'Trung cấp',cost:11500000,price:15000000,stock:0},
{id:'p21',category:'Điện lạnh',brand:'Sa'+'msung',name:'Tủ lạnh Sa'+'msung 380L Inverter',segment:'Trung cấp',cost:9500000,price:12500000,stock:0},
{id:'p22',category:'Điện lạnh',brand:'L'+'G',name:'Máy giặt L'+'G 10kg Inverter',segment:'Trung cấp',cost:8500000,price:11500000,stock:0},
{id:'p23',category:'Điện lạnh',brand:'Dai'+'kin',name:'Điều hòa Dai'+'kin 12000BTU Inverter',segment:'Cao cấp',cost:12500000,price:16500000,stock:0},
{id:'p24',category:'Gia dụng',brand:'Xi'+'aomi',name:'Robot hút bụi Xi'+'aomi X10',segment:'Trung cấp',cost:6500000,price:8800000,stock:0},
{id:'p25',category:'Gia dụng',brand:'Phi'+'lips',name:'Nồi chiên không dầu Phi'+'lips 7L',segment:'Trung cấp',cost:2800000,price:3900000,stock:0},
{id:'p26',category:'Điện thoại',brand:'Re'+'alme',name:'Re'+'alme 13 Pro 256GB',segment:'Trung cấp',cost:6800000,price:8900000,stock:0},
{id:'p27',category:'Laptop',brand:'Ac'+'er',name:'Ac'+'er Aspire 5 15.6 inch',segment:'Trung cấp',cost:12500000,price:15900000,stock:0},
{id:'p28',category:'Máy tính bảng',brand:'Le'+'novo',name:'Le'+'novo Tab P12 12.7 inch',segment:'Trung cấp',cost:7200000,price:9500000,stock:0},
{id:'p29',category:'Đồng hồ',brand:'Hu'+'awei',name:'Hu'+'awei Watch GT 4 46mm',segment:'Trung cấp',cost:5200000,price:7100000,stock:0},
{id:'p30',category:'Tai nghe',brand:'J'+'BL',name:'Tai nghe J'+'BL Tune 770NC',segment:'Trung cấp',cost:1800000,price:2600000,stock:0},
{id:'p31',category:'Loa',brand:'Ma'+'rshall',name:'Loa Ma'+'rshall Emberton II',segment:'Cao cấp',cost:5200000,price:7100000,stock:0},
{id:'p32',category:'Phụ kiện',brand:'Ba'+'seus',name:'Sạc dự phòng Ba'+'seus 20000mAh 65W',segment:'Trung cấp',cost:750000,price:1150000,stock:0},
{id:'p33',category:'TV',brand:'So'+'ny',name:'TV So'+'ny Bravia 55 inch 4K',segment:'Cao cấp',cost:16500000,price:21500000,stock:0},
{id:'p34',category:'Điện lạnh',brand:'Pa'+'nasonic',name:'Tủ lạnh Pa'+'nasonic 300L Inverter',segment:'Trung cấp',cost:8800000,price:11800000,stock:0},
{id:'p35',category:'Gia dụng',brand:'Elec'+'trolux',name:'Máy hút bụi Elec'+'trolux 1600W',segment:'Trung cấp',cost:2200000,price:3100000,stock:0},
{id:'p36',category:'Gia dụng',brand:'Lo'+'cknLock',name:'Bình giữ nhiệt Lo'+'cknLock 1L',segment:'Phổ thông',cost:450000,price:680000,stock:0}
  ];

// TU SINH - DIEN THOAI DUNG DANH SACH THAT
(function(){
  let phoneModels=[
    {b:'Ap'+'ple', pre:'iPh'+'one', models:['11','11 Pro','11 Pro Max','12','12 mini','12 Pro','12 Pro Max','13','13 mini','13 Pro','13 Pro Max','14','14 Plus','14 Pro','14 Pro Max','15','15 Plus','15 Pro','15 Pro Max','16','16 Plus','16 Pro','16 Pro Max','16e','17','17 Pro','17 Pro Max','Air']},
    {b:'Sa'+'msung', pre:'Ga'+'laxy', models:['A05','A05s','A06','A07','A14','A15','A16','A17','A24','A25','A26','A34','A35','A36','A54','A55','A56','S23','S23+','S23 Ultra','S24','S24+','S24 Ultra','S24 FE','S25','S25+','S25 Ultra','S25 FE','S26','S26+','S26 Ultra','Z Flip5','Z Flip6','Z Flip7','Z Fold5','Z Fold6','Z Fold7']},
    {b:'Xi'+'aomi', pre:'', models:['12','12 Pro','13','13 Pro','13 Ultra','14','14 Pro','14 Ultra','15','15 Pro','15 Ultra','15T','15T Pro','17','17 Pro','17 Ultra']},
    {b:'Re'+'dmi', pre:'', models:['9A','10','12','12C','13C','13','14C','A3','A5','Note 11','Note 12','Note 12 Pro','Note 13','Note 13 Pro','Note 13 Pro+','Note 14','Note 14 Pro','Note 14 Pro+','Note 15','Note 15 Pro']},
    {b:'PO'+'CO', pre:'', models:['C40','C65','C75','M5','M6','M6 Pro','M7 Pro','X5 Pro','X6','X6 Pro','X7','X7 Pro','F5','F6','F6 Pro','F7','F7 Pro','F7 Ultra']},
    {b:'OP'+'PO', pre:'', models:['A16','A17','A18','A38','A54 5G','A58','A60','A78','A73 5G','A74 5G','A79','A3','A5','Reno8','Reno8 T','Reno10','Reno11','Reno11 F','Reno12','Reno12 F','Reno13','Reno13 F','Reno14','Find X5 Pro','Find X6 Pro','Find X7 Ultra','Find X8','Find X8 Pro','Find X9','Find X9 Pro']},
    {b:'Vi'+'vo', pre:'', models:['Y16','Y17s','Y18','Y19s','Y20','Y21','Y22s','Y27','Y28','Y29','Y36','Y38','V25','V27','V29','V30','V40','V50','X100','X100 Pro','X200','X200 Pro']},
    {b:'Re'+'alme', pre:'', models:['C11','C21Y','C25','C30','C33','C35','C51','C53','C55','C61','C63','C65','C67','C75','9','10','11','12','12+','13+','14 Pro','GT Neo 5','GT 6','GT 7 Pro']},
    {b:'HO'+'NOR', pre:'', models:['X7b','X8b','X9b','200']},
    {b:'Hu'+'awei', pre:'', models:['Nova 9','Nova 11','Nova 12','Pura 70']}
  ];
  let storages=['128GB','256GB','512GB'];
  let idNum=1000;
  phoneModels.forEach(g=>{
    g.models.forEach((md, idx)=>{
      let storage=storages[idx%storages.length];
      let fullName=(g.pre?g.pre+' ':'')+md+' '+storage;
      if(masterProductsList.find(p=>p.name===fullName)) return;
      let isCaoCap = md.indexOf('Pro Max')>=0 || md.indexOf('Ultra')>=0 || md.indexOf('Fold')>=0 || md.indexOf('Flip')>=0 || md.indexOf('Pro')>=0;
      let isPhoThong = md.indexOf('A0')>=0 || md[0]==='C' || md.indexOf('9A')>=0 || md.indexOf('Y1')>=0 || md.indexOf('A1')>=0;
let seg=isCaoCap?'Cao cấp':(isPhoThong?'Phổ thông':'Trung cấp');

let baseCost = isCaoCap ? 18000000 + Math.random()*12000000 : isPhoThong ? 3500000 + Math.random()*1500000 : 7000000 + Math.random()*4000000;
let storageAdd=storage==='256GB'?1200000:(storage==='512GB'?3500000:0);
      let cost=Math.round((baseCost+storageAdd)/1000)*1000;
      let price=Math.round(cost*1.28/1000)*1000;
      masterProductsList.push({id:'auto'+idNum, category:'Điện thoại', brand:g.b, name:fullName, segment:seg, cost:cost, price:price, stock:0});
      idNum++;
    });
  });
  let brandPool={
    'Laptop':[['Ap','ple'],['AS','US'],['De','ll'],['H','P'],['Le','novo'],['Ac','er'],['MS','I']],
    'Máy tính bảng':[['Ap','ple'],['Sa','msung'],['Le','novo'],['Xi','aomi'],['Hu','awei']],
    'Đồng hồ':[['Ap','ple'],['Sa','msung'],['Hu','awei'],['Xi','aomi'],['Am','azfit']],
    'Tai nghe':[['So','ny'],['Ap','ple'],['J','BL'],['Sa','msung'],['An','ker']],
    'Loa':[['J','BL'],['So','ny'],['Ma','rshall'],['H','arman Kardon'],['Xi','aomi']],
    'Phụ kiện':[['An','ker'],['Logi','tech'],['Be','lkin'],['Ba','seus'],['Ug','reen']],
    'TV':[['Sa','msung'],['L','G'],['TC','L'],['So','ny'],['Xi','aomi']],
    'Điện lạnh':[['Sa','msung'],['L','G'],['Dai','kin'],['Pa','nasonic'],['To','shiba']],
    'Gia dụng':[['Xi','aomi'],['Phi','lips'],['Elec','trolux'],['Lo','cknLock'],['Pa','nasonic']]
  };
  let cats=['Laptop','Máy tính bảng','Đồng hồ','Tai nghe','Loa','Phụ kiện','TV','Điện lạnh','Gia dụng'];
  let realNames={
    'Laptop':['Air M2','Inspiron 15','Victus 16','IdeaPad Slim 3','ThinkPad E14','VivoBook 15','Swift 3','Katana 15','MacBook Air M3','ZenBook 14','Aspire 7','Legion 5','Surface Laptop 5','Pavilion Aero','ROG Strix G15'],
    'Máy tính bảng':['Tab A9','Tab S9','Pad 6','Pad Air','Tab P11','MatePad 11','Tab M10','iPad 10','iPad Mini 6','Tab A8','Pad SE','Tab S6 Lite','MatePad SE','Tab P12','iPad Air 5'],
    'Đồng hồ':['Watch 6','Watch GT 4','Watch Series 9','Watch SE 2','Fit 3','Watch 5 Pro','Amazfit GTR 4','Watch Fit 2','Watch 4 Classic','Versa 4','Watch Ultra 2','Watch 6 Classic','Band 8','Watch S1','GTS 4'],
    'Tai nghe':['WH-CH720N','AirPods 4','Tune 510BT','Buds 2 Pro','FreeBuds SE 3','WF-1000XM5','AirPods Max','Buds FE','Tune Beam','WH-1000XM4','Ear 2','Enco Buds 2','Buds Live','Tune 230NC','AirPods Pro 2'],
    'Loa':['Flip 6','SRS-XE300','Emberton II','Charge 5','PartyBox 110','XB43','Go 3','Aura Studio 3','Link Portable','SRS-XB33','Boom 2','W-King D9','Stanmore III','JBL Pulse 5','SRS-RA3000'],
    'Phụ kiện':['Sạc 65W GaN','MX Master 3S','MX Keys','Cáp USB-C 100W','Sạc dự phòng 20000mAh','Chuột G Pro','Bàn phím K380','Hub USB-C 7in1','Ốp lưng MagSafe','Dán cường lực','Giá đỡ laptop','Balo laptop','Tai nghe dây','Sạc MagSafe','Ổ cắm 6 chấu'],
    'TV':['QLED Q70C 55','OLED C3 55','QLED 65 4K','Bravia 55 4K','Crystal UHD 55','OLED A2 55','QNED 55','The Frame 55','Google TV 55','QLED Q60C 65','OLED B3 55','UHD 4K 50','QLED 75 4K','Bravia X90K 65','OLED G3 65'],
    'Điện lạnh':['Tủ lạnh 380L Inverter','Máy giặt 10kg Inverter','Điều hòa 12000BTU','Tủ lạnh 300L Inverter','Máy giặt 9kg','Điều hòa 9000BTU','Tủ đông 200L','Máy sấy 8kg','Tủ lạnh Side by Side','Máy giặt sấy 10kg','Điều hòa 18000BTU','Tủ lạnh 2 cánh','Máy giặt 12kg','Tủ mát 300L','Điều hòa âm trần'],
    'Gia dụng':['Robot X10','Nồi chiên 7L','Máy hút bụi 1600W','Bình giữ nhiệt 1L','Máy xay sinh tố','Nồi cơm 1.8L','Quạt không cánh','Máy lọc không khí','Bàn ủi hơi nước','Máy pha cà phê','Nồi áp suất','Máy rửa chén','Lò vi sóng 30L','Máy sấy tóc','Ấm siêu tốc']
  };
  let basePrice={'Laptop':16000000,'Máy tính bảng':8000000,'Đồng hồ':5000000,'Tai nghe':2500000,'Loa':3000000,'Phụ kiện':800000,'TV':13000000,'Điện lạnh':9000000,'Gia dụng':2000000};
  cats.forEach(cat=>{
    let cur=masterProductsList.filter(p=>p.category===cat).length;
    let need=50-cur;
    for(let i=0;i<need;i++){
      let bp=brandPool[cat][(cur+i)%brandPool[cat].length];
      let brand=bp[0]+bp[1];
      let idx=cur+i+1;
      let seg=idx%3===0?'Cao cấp':(idx%3===1?'Trung cấp':'Phổ thông');
      let cost=Math.round((basePrice[cat]*(0.7+(idx%5)*0.15+Math.random()*0.2))/1000)*1000;
      let price=Math.round(cost*1.32/1000)*1000;
      let pool=realNames[cat];
      let tenThat=pool[(cur+i)%pool.length];
      let suffix=cat==='TV'?' '+(43+idx%5*5)+' inch 4K':(cat==='Laptop'?' '+(13+idx%4)+' inch':'');
      let name=tenThat+suffix;
      masterProductsList.push({id:'auto'+idNum, category:cat, brand:brand, name:brand+' '+name, segment:seg, cost:cost, price:price, stock:0});
      idNum++;
    }
  });
})();
      const staffRolesDefinition=[
 {key:'director',name:'Giám đốc siêu thị',salary:18000000,count:0, tier:'supermarket'},
 {key:'biz_manager',name:'Quản lý kinh doanh',salary:12000000,count:0, tier:'supermarket'},
 {key:'warehouse_manager',name:'Quản lý kho',salary:11000000,count:0, tier:'supermarket'},
 {key:'hr_manager',name:'Quản lý nhân sự',salary:11000000,count:0, tier:'supermarket'},
 {key:'finance_manager',name:'Quản lý tài chính',salary:12000000,count:0, tier:'supermarket'},
 {key:'sales_staff',name:'Nhân viên bán hàng',salary:4500000,count:0, tier:'store'},
 {key:'cashier_staff',name:'Nhân viên thu ngân POS',salary:4500000,count:0, tier:'store'},
 {key:'warehouse_staff',name:'Nhân viên Kho',salary:4000000,count:0, tier:'store'},
 {key:'shipper',name:'Shipper giao hàng',salary:4200000,count:0, tier:'store'},
 {key:'tech_staff',name:'Kỹ thuật viên sửa chữa',salary:6500000,count:0, tier:'store'},
 {key:'cskh',name:'Nhân viên CSKH',salary:5500000,count:0, tier:'supermarket'},
 {key:'security',name:'Nhân viên Bảo vệ',salary:4000000,count:0, tier:'store'},
 {key:'cleaner',name:'Nhân viên Lao công',salary:3500000,count:0, tier:'store'}
];

const upgradesDefinition=[
 {id:'camera',name:'Hệ thống Camera AI an ninh',desc:'Tăng uy tín và giảm thất thoát',cost:25000000,owned:0,maxOwned:3,level:0,maxLevel:100},
 {id:'pos_system',name:'Hệ thống máy POS thanh toán',desc:'Tăng tốc độ phục vụ khách',cost:18000000,owned:0,maxOwned:5,level:0,maxLevel:100},
 {id:'shelves',name:'Kệ trưng bày LED cao cấp',desc:'Tăng thẩm mỹ và sức chứa',cost:15000000,owned:1,maxOwned:10,level:1,maxLevel:100},
 {id:'store_size',name:'Mở rộng diện tích mặt bằng',desc:'Tăng không gian kinh doanh +50m²',cost:50000000,owned:1,maxOwned:5,level:1,maxLevel:100},
 {id:'ac_system',name:'Điều hòa trung tâm âm trần',desc:'Giữ chân khách lâu hơn',cost:30000000,owned:0,maxOwned:2,level:0,maxLevel:100},
 {id:'repair_tools',name:'Bộ dụng cụ sửa chữa Tầng 2',desc:'Mở rộng sửa chữa bảo hành',cost:22000000,owned:0,maxOwned:4,level:0,maxLevel:100}
];

const bankLoansList=[
 {id:'loan_1',name:'Gói Vay Cứu - 500Tr (Mở ngày 4)',amount:500000000,interest:0.05,term:'7 Ngày', minDay:4},
 {id:'loan_2',name:'Gói Vay Mở Rộng - 1 Tỷ',amount:1000000000,interest:0.08,term:'30 Ngày', minDay:15},
 {id:'loan_3',name:'Gói Vay Chiến Lược - 2 Tỷ',amount:2000000000,interest:0.10,term:'60 Ngày', minDay:30}
];

const vipDialogues=[
 {customer:"Doanh nhân Hùng",text:"Tôi cần mua 5 laptop cao cấp cho nhân viên, có hỗ trợ VAT không?",options:[
   {label:"Tư vấn MacBook Pro M3 + Chiết khấu 5%",correct:true,reward:220000000,ratingStars:5,msg:"Doanh nhân Hùng chốt ngay 5 máy!"},
   {label:"Bán laptop tồn kho",correct:false,reward:50000000,ratingStars:2,msg:"Khách chưa hài lòng."}
 ]},
 {customer:"Sinh viên Minh",text:"Tôi muốn mua tai nghe chống ồn tầm 7-8 triệu để học bài!",options:[
   {label:"Tư vấn Sony WH-1000XM5 đúng giá",correct:true,reward:8200000,ratingStars:5,msg:"Sinh viên Minh đánh giá 5 sao!"},
   {label:"Tư vấn tai nghe giá cao không phù hợp",correct:false,reward:3000000,ratingStars:1,msg:"Khách chưa hài lòng và rời đi."}
 ]}
];

let gameState={
 day:1,cash:500000000,dailyRevenue:0,totalRevenue:0,totalCostSpent:0,totalSalaryPaid:0,totalTaxPaid:0,
 rating:5.0,ratingCount:0,ratingTotal:0,branchRevenueTotal:0,branchExpenseTotal:0,branchDailyRevenue:0,
 currentHour:8, gameMinute:0, isShopOpen:false,currentFloor:1,selectedProvince:provincesList[1],storeAreaM2:150,
 selectedCategory:'Điện thoại',selectedBrand:'all',selectedSegment:'all',
 tier:'store', branches:[], staff:staffRolesDefinition,staffMembers:[], products:masterProductsList,upgrades:upgradesDefinition,loansActive:[],
 guideMode:'off', guideEnabled:false, isOnline:false, onlineRevenue:0, onlineOrders:[],attendanceResolved:[], sellTimeOption:4, guideStep:0
};
let gameLoopInterval=null; let qtyMap={};
let guideSteps=[
{target:'tabBtn-inventory', text:'B1-Quầy hàng'},
{target:'tabBtn-staff', text:'B2-Nhân viên'},
{target:'tabBtn-upgrades', text:'B3-Nâng cấp'},
{target:'tabBtn-attendance', text:'B4-Chấm công'},
{target:'tabBtn-inventory', text:'B5-Quầy hàng'},
{target:'openShopBtn', text:'B6-Mở bán'}
];
function getTickMs(){
  if(gameState.sellTimeOption===6) return 80000;
  if(gameState.sellTimeOption===8) return 120000;
  return 40000;
}
function renderBankLoans(){
  const container=document.getElementById('bankLoansList'); if(!container) return;
  container.innerHTML='';
  bankLoansList.forEach(loan=>{
    let card=document.createElement('div'); card.className='control-card';
    let daVay=gameState.loansActive.find(l=>l.id===loan.id);
    card.innerHTML='<div><div class="card-title">'+loan.name+'</div><div class="card-desc">Lãi: '+(loan.interest*100)+'% | Kỳ hạn: '+loan.term+' | Mở ngày '+loan.minDay+'</div></div><button onclick="takeLoan(\''+loan.id+'\')" class="btn-cyan" '+(gameState.day<loan.minDay||daVay?'disabled':'')+'>'+(daVay?'Đã vay':(gameState.day<loan.minDay?'Chưa mở':'Vay ngay'))+'</button>';
    container.appendChild(card);
  });
}
function enterGame(){ playSound('upgrade'); document.getElementById('welcomeScreen').classList.add('hidden'); document.getElementById('gameMainInterface').classList.remove('hidden'); initChipsFilters(); filterProducts(); renderStaffTab(); renderAttendanceTab(); renderProvincesScrollList(); renderBankLoans(); renderUpgrades(); renderBranches(); updateUI(); logEvent("Hệ thống sẵn sàng!"); if(gameState.guideEnabled) setTimeout(()=>startGuide(),600); }
function logEvent(msg){ const logBox=document.getElementById('eventLog'); if(!logBox) return; let timeStr='[Ngày '+gameState.day+' - '+String(gameState.currentHour).padStart(2,'0')+':'+String(gameState.gameMinute||0).padStart(2,'0')+']'; const item=document.createElement('div'); item.className='log-item'; item.innerHTML='<strong>'+timeStr+'</strong> '+msg; logBox.insertBefore(item,logBox.firstChild); if(logBox.children.length>25) logBox.removeChild(logBox.lastChild); }
function addReview(stars, reason){
  gameState.ratingCount++; gameState.ratingTotal+=stars;
  if(gameState.ratingCount===1) gameState.rating=stars; else gameState.rating=gameState.ratingTotal/gameState.ratingCount;
  gameState.rating=Math.max(1,Math.min(5,gameState.rating)); logEvent('Khách đánh giá '+stars+' sao - '+reason+' (TB: '+gameState.rating.toFixed(1)+' sao / '+gameState.ratingCount+')'); updateUI();
}
function adjustRating(delta, reason){ gameState.rating=Math.max(1,Math.min(5,gameState.rating+delta)); if(reason) logEvent('Đánh giá '+(delta>0?'+':'')+delta.toFixed(1)+' - '+reason); updateUI(); }
function openSettingsModal(){ document.getElementById('settingsModal').classList.remove('hidden'); document.getElementById('sellTimePickerBox').classList.add('hidden'); updateSettingsLabels(); }
function closeSettingsModal(){ document.getElementById('settingsModal').classList.add('hidden'); }
function updateSettingsLabels_cu(){
  document.getElementById('guideSettingLabel').innerText = gameState.guideEnabled ? 'Luôn bật' : 'Đã tắt';
  let map={4:'4 phút = 10 phút thực',6:'6 phút = 20 phút thực',8:'8 phút = 30 phút thực'};
  document.getElementById('sellTimeLabel').innerText = map[gameState.sellTimeOption]||'4 phút = 10 phút thực';
}
function openGuideModal(){ closeSettingsModal(); document.getElementById('guideModal').classList.remove('hidden'); }
function closeGuideModal(){ document.getElementById('guideModal').classList.add('hidden'); }
function toggleGuideSetting_cu(){
  gameState.guideEnabled=!gameState.guideEnabled;
  if(gameState.guideEnabled){ showGameDialog('Đã bật Chỉ dẫn từng bước. Khung đỏ sẽ hiện quanh nút cần bấm.', 'Chỉ dẫn từng bước'); startGuide(); }
  else { clearGuideHighlight(); showGameDialog('Đã tắt Chỉ dẫn từng bước.', 'Chỉ dẫn từng bước'); }
  updateSettingsLabels();
}
function openSellTimePicker(){ document.getElementById('sellTimePickerBox').classList.toggle('hidden'); }
function setSellTime(v){
  gameState.sellTimeOption=v; updateSettingsLabels(); document.getElementById('sellTimePickerBox').classList.add('hidden');
  if(gameState.isShopOpen){ stopGameLoop(); startGameLoop(); }
  showGameDialog('Đã chọn thời gian bán mỗi ngày: '+v+' phút = '+(v===4?'10':v===6?'20':'30')+' phút thực tế.', 'Thời gian bán');
}
function startGuide_cu(){ if(!gameState.guideEnabled) return; gameState.guideStep=0; showGuideStep(0); }
function showGuideStep_cu(idx){
  clearGuideHighlight();
  if(idx>=guideSteps.length){ clearGuideHighlight(); return; }
  let step=guideSteps[idx];
  gameState.guideStep=idx;
  let el=document.getElementById(step.target);
  if(!el) return;
  el.classList.add('guide-highlight');
  el.scrollIntoView({block:'center', behavior:'smooth'});

  // Bong bóng chữ dính vào nút cần bấm, không để trên đầu nữa
  const tip=document.getElementById('guideTooltip');
  document.getElementById('guideTooltipText').innerText=step.text;
  tip.classList.remove('hidden');

  // Đợi cuộn xong rồi mới đo vị trí nút
  setTimeout(()=>{
    let r=el.getBoundingClientRect();
    let tipW=260;
    let left=r.left;
    if(left+tipW > window.innerWidth-10) left=window.innerWidth-tipW-10;
    if(left<10) left=10;
    // Nếu nút ở nửa dưới màn hình thì hiện chữ ở trên nút, không bị che
    if(r.bottom+110 > window.innerHeight){
      tip.style.top=(r.top-110)+'px';
    } else {
      tip.style.top=(r.bottom+8)+'px';
    }
    tip.style.left=left+'px';
  }, 150);
}
function nextGuideStep_cu(){
  let next=gameState.guideStep+1;
  if(next>=guideSteps.length) {
   skipGuide();
    gameState.guideEnabled=false;
    updateSettingsLabels();
    showGameDialog('Bạn đã đi hết 1 vòng: Nhập hàng -> Mở bán -> Tuyển NV -> Bán -> Nâng cấp -> Lên Siêu thị -> Chi nhánh -> Đóng ca. Từ giờ hướng dẫn tự tắt để bạn tự nhớ và tự chơi.', 'Hoàn thành hướng dẫn');
   return;
  }
  showGuideStep(next); 
}
function skipGuide_cu(){ 
  clearGuideHighlight(); 
  document.getElementById('guideTooltip').classList.add('hidden');
}
function clearGuideHighlight_cu(){ document.querySelectorAll('.guide-highlight').forEach(e=>e.classList.remove('guide-highlight')); }

function toggleOpenShop(){
  gameState.isShopOpen=!gameState.isShopOpen; updateOpenShopButtonState();if(gameState.isShopOpen) onGuideButtonClicked('openShopBtn');
  if(gameState.isShopOpen){ logEvent("Cửa hàng đã mở bán!"); startGameLoop(); triggerRandomVipCustomer();
  if(gameState.guideEnabled) showGuideStep(1); }
  else { logEvent("Cửa hàng đã đóng cửa."); stopGameLoop(); 
  renderStaffTab();
       }
}  
function updateOpenShopButtonState(){
  const openBtn=document.getElementById('openShopBtn'); const closeBtn=document.getElementById('closeShopBtn'); const statusEl=document.getElementById('timeStatus');
  if(gameState.isShopOpen){ openBtn.classList.add('hidden'); closeBtn.classList.remove('hidden'); if(statusEl){statusEl.innerText="Đang mở bán"; statusEl.className="status-open";} }
  else { openBtn.classList.remove('hidden'); closeBtn.classList.add('hidden'); if(statusEl){statusEl.innerText="Đóng cửa"; statusEl.className="status-closed";} }
}
function startGameLoop(){
  if(gameLoopInterval) clearInterval(gameLoopInterval);
  gameLoopInterval=setInterval(()=>{
    if(!gameState.isShopOpen) return;
    gameState.gameMinute+=5;
    if(gameState.gameMinute>=60){
      gameState.gameMinute=0;
      gameState.currentHour++;
    }
    if(gameState.currentHour>22){
      gameState.currentHour=8;
      gameState.gameMinute=0;
      manualCloseShift();
      return;
    }
    updateUI();
    simulateBranchIncome();
    let staffCountB21 = gameState.staff.reduce((s,x)=>s+x.count,0);
    let avgSpirit=gameState.staffMembers.length>0 ? gameState.staffMembers.reduce((s,x)=>s+x.spirit,0)/gameState.staffMembers.length : 100;
    let spiritMul=avgSpirit<30?0.7:(avgSpirit<70?0.85:1);
    let rateB21 = staffCountB21===0 ? 0.30 : (0.55 + Math.min(staffCountB21*0.03, 0.25)) * spiritMul;
    if(gameState.weather==='mua') rateB21 *= 0.7;
    if(gameState.weather==='nang') rateB21 *= 1.1;
        // BÁN ONLINE - Tạo đơn chờ xác nhận
    if(gameState.isOnline){
      let rateOnline = gameState.weather==='mua' ? 0.50 : (gameState.weather==='nang' ? 0.22 : 0.35);
      if(Math.random()<rateOnline && (gameState.onlineOrders||[]).length<3){
        createOnlineOrder();
      }
    }
    if(Math.random()<rateB21){
    let coHang=gameState.products.filter(x=>x.stock>0);
      if(coHang.length===0){
    logEvent('Khách vào xem nhưng hết hàng:((');
      } else {
        let p=coHang[Math.floor(Math.random()*coHang.length)];
        if(p && p.stock>0){
          p.stock--;
          let earned=Math.round(p.price*gameState.selectedProvince.advX);
          gameState.cash+=earned;
          gameState.dailyRevenue+=earned;
          gameState.totalRevenue+=earned;
          playSound('cash');
                    // Tinh thần: 1 nhân viên ngẫu nhiên bị mệt khi bán
          if(gameState.staffMembers.length>0){
            let nv=gameState.staffMembers[Math.floor(Math.random()*gameState.staffMembers.length)];
            nv.spirit=Math.max(0, nv.spirit-5);
            if(nv.spirit===30) logEvent('⚠️ '+(nv.gender==='nu'?'Chị ':'Anh ')+nv.name+' mệt rồi (Tinh thần 30), bấm 💤 Nghỉ ngơi cho '+nv.name+' đi!');
            if(nv.spirit===0) logEvent('🥵 '+(nv.gender==='nu'?'Chị ':'Anh ')+nv.name+' kiệt sức, bán chậm hẳn!');
            renderStaffTab();
          }
          updateUI();
          filterProducts();
          let tenNamB21=['Quốc Bảo','Đức Anh','Hoàng Nam','Tuấn Kiệt','Gia Huy','Minh Quân','Hữu Phúc','Anh Tuấn','Văn Dũng','Hải Đăng','Chí Kiên','Thanh Sơn','Thế Anh','Đình Phong','Việt Hoàng','Gia Bảo','Hoàng Long','Khắc Huy','Minh Đức'];
          let tenNuB21=['Minh Anh','Thu Hằng','Phương Linh','Khánh Vy','Thanh Thảo','Ngọc Ánh','Diệu Linh','Kim Ngân','Thu Trang','Mai Phương','Hồng Nhung','Bảo Ngọc','Lan Anh','Quỳnh Chi','Thanh Hà','Thảo Nguyên','Ngọc Huyền','Thanh Tú','Anh Thư','Minh Châu','Yến Nhi'];
          let laNuB21=Math.random()<0.5;
          let khach=(laNuB21?tenNuB21:tenNamB21)[Math.floor(Math.random()*(laNuB21?tenNuB21.length:tenNamB21.length))];
          let tuoiKhach=18+Math.floor(Math.random()*40);
          let giauB21=Math.random()<0.3;
          logEvent('Khách '+(laNuB21?'chị ':'anh ')+khach+' ('+tuoiKhach+' tuổi, '+(giauB21?'khá giả':'bình dân')+') mua 1 '+p.name+' (+'+formatVND(earned)+')');
          if(staffCountB21===0) logEvent('Bạn đang tự bán, không có nhân viên phục vụ.');
          if(Math.random()<0.35){
            let totalStaff=gameState.staff.reduce((s,x)=>s+x.count,0);
            let stars=totalStaff===0?(Math.random()<0.5?2:3):totalStaff>=3?(Math.random()<0.7?5:4):(Math.random()<0.5?4:3);
            addReview(stars,'Mua '+p.name);
          }
        } else if(Math.random()<0.15){
            adjustRating(-0.1,'Khách hỏi mà hết hàng');
        }
        let totalStaff2=gameState.staff.reduce((s,x)=>s+x.count,0);
        if(totalStaff2===0 && Math.random()<0.1){
            adjustRating(-0.05,'Không có nhân viên phục vụ');
        }
      }
    }
  }, 5000);
}
function stopGameLoop(){ if(gameLoopInterval){clearInterval(gameLoopInterval); gameLoopInterval=null;} }
function switchFloor(){
  const f1=document.getElementById('floor1Content'); const f2=document.getElementById('floor2Content'); const btn=document.getElementById('floorSwitchBtn'); const ind=document.getElementById('floorIndicator');
  if(gameState.currentFloor===1){ gameState.currentFloor=2; if(f1) f1.classList.add('hidden'); if(f2) f2.classList.remove('hidden'); if(btn){ btn.innerText="Chuyển Tầng 1"; btn.classList.add('floor2'); } if(ind) ind.innerText="Tầng 2 (Kỹ thuật & BH)"; logEvent("Đã chuyển sang Tầng 2"); }
  else { gameState.currentFloor=1; if(f2) f2.classList.add('hidden'); if(f1) f1.classList.remove('hidden'); if(btn){ btn.innerText="Chuyển Tầng 2"; btn.classList.remove('floor2'); } if(ind) ind.innerText="Tầng 1 (Trưng bày)"; logEvent("Đã chuyển sang Tầng 1"); }
}
function triggerRandomVipCustomer(){
  const container=document.getElementById('dialogueChatScroll'); const actions=document.getElementById('dialogueActionsContainer'); if(!container||!actions) return;
  let vip=vipDialogues[Math.floor(Math.random()*vipDialogues.length)];
  container.innerHTML='<div class="chat-message-item"><div class="chat-sender text-amber-300">'+vip.customer+'</div><div class="chat-text">"'+vip.text+'"</div></div>';
  actions.innerHTML=''; actions.classList.remove('hidden');
  vip.options.forEach(opt=>{
    let btn=document.createElement('button'); btn.className='btn-cyan text-[9px] p-1 rounded font-bold'; btn.innerText=opt.label;
    btn.onclick=()=>{ gameState.cash+=opt.reward; gameState.dailyRevenue+=opt.reward; gameState.totalRevenue+=opt.reward; addReview(opt.ratingStars, opt.msg); if(opt.correct) playSound('cash'); else playSound('error'); logEvent('VIP: '+opt.msg+' (+'+formatVND(opt.reward)+')'); actions.classList.add('hidden'); updateUI(); };
    actions.appendChild(btn);
  });
}

function upgradeToSupermarket(){
  if(gameState.tier==='supermarket'){ showGameDialog('Bạn đã là Siêu thị rồi.', 'Lên Siêu thị'); return; }
  let needDay=15, needCash=800000000, needRating=4.0;
  if(gameState.day < needDay){ showGameDialog('Chưa đủ ngày. Cần ngày '+needDay+', bạn đang ở ngày '+gameState.day+'.', 'Chưa đủ điều kiện'); return; }
  if(gameState.cash < needCash){ showGameDialog('Chưa đủ tiền. Cần '+formatVND(needCash)+', bạn đang có '+formatVND(gameState.cash)+'.', 'Chưa đủ điều kiện'); return; }
  if(gameState.rating < needRating){ showGameDialog('Đánh giá chưa đủ. Cần '+needRating+' sao, bạn đang có '+gameState.rating.toFixed(1)+' sao.', 'Chưa đủ điều kiện'); return; }
  showConfirmDialog('Lên SIÊU THỊ?\n- Mở full 13 vị trí (Giám đốc + Quản lý)\n- Header đổi thành Siêu thị Thế giới công nghệ\n- Không mất đồ đã sở hữu', 'Lên Siêu thị', ()=>{
    gameState.tier='supermarket'; updateUI(); renderStaffTab(); renderBankLoans(); playSound('upgrade');
    logEvent("Đã lên SIÊU THỊ THẾ GIỚI CÔNG NGHỆ! Mở khóa full 13 vị trí!");
    showGameDialog('Chúc mừng! Bạn đã lên Siêu thị.', 'Lên Siêu thị');
  });
}
function openBranch(provinceName){
  let prov=provincesList.find(p=>p.name===provinceName);
  if(gameState.branches.find(b=>b.provinceName===provinceName)){ showGameDialog('Chi nhánh ở tỉnh này đã mở rồi.', 'Chi nhánh'); return; }
  showConfirmDialog('Mở Chi nhánh trực thuộc tại '+provinceName+'?\n- Sau khi mở, cần Thuê Leader thì chi nhánh mới có doanh thu báo về\n- Nhận ngay 100Tr hỗ trợ mở chi nhánh\n- Thuế đất hàng tháng: '+formatVND(prov.priceM2*80), 'Mở chi nhánh', ()=>{
    gameState.cash+=100000000;
    gameState.branches.push({provinceName:prov.name, priceM2:prov.priceM2, advX:prov.advX, leader:null, leaderName:'', revenueTotal:0, expenseTotal:0, everOpened:true});
    updateUI(); renderBranches(); playSound('cash');
    logEvent('Đã mở Chi nhánh trực thuộc tại '+provinceName+' - Nhận 100Tr hỗ trợ');
    showGameDialog('Đã mở chi nhánh tại '+provinceName+' và nhận 100Tr. Hãy bấm Thuê Leader để chi nhánh bắt đầu bán hàng.', 'Mở chi nhánh thành công');
  });
}
function hireBranchLeader(provinceName){
  let b=gameState.branches.find(x=>x.provinceName===provinceName);
  if(b.leader){ showGameDialog('Chi nhánh đã có Leader rồi.', 'Chi nhánh'); return; }
  let fee=4000000;
  if(gameState.cash<fee){ playSound('error'); showGameDialog('Không đủ tiền thuê Leader. Cần '+formatVND(fee)+'.', 'Thuê Leader'); return; }
  let leadersNam=['Anh Tuấn','Quốc Huy','Đức Mạnh','Hoàng Anh','Minh Quân','Tuấn Kiệt'];
let leadersNu=['Minh Hằng','Thu Thảo','Lan Phương','Phương Linh','Thu Hằng','Ngọc Ánh'];
let isNu=Math.random()<0.5;
let name=isNu?leadersNu[Math.floor(Math.random()*leadersNu.length)]:leadersNam[Math.floor(Math.random()*leadersNam.length)];
let gender=isNu?'nu':'nam';
gameState.cash-=fee; b.leader=true; b.leaderName=name; b.leaderGender=gender;
  updateUI(); renderBranches(); playSound('buy');
  logEvent('Thuê Leader '+name+' cho chi nhánh '+provinceName+' (4Tr)');
}
function simulateBranchIncome(){
  if(!gameState.branches) return;
  gameState.branches.forEach(b=>{
    // B2.2 - Chi nhánh: Không có Leader thì đóng cửa, doanh thu 0đ nhưng vẫn trừ tiền thuê
    let expense = Math.round((b.priceM2 || 500000) * 80 / 30 / 3);
    gameState.cash -= expense;
    if(!b.leader){
      return;
    }
    if(b.leader && !b.leaderOnLeave && Math.random()<0.02){ leaderResignRequest(b); return; }
    // Doanh thu gốc của chi nhánh
    let rev = Math.round((b.baseRevenue || 5000000) * (0.8 + Math.random()*0.4));
    // B2.2 - Leader có cấp thì doanh thu khác nhau
    if(b.leaderSkill==='S') rev = rev * 1.3;
    else if(b.leaderSkill==='A') rev = rev * 1.15;
    else if(b.leaderSkill==='D') rev = rev * 0.85;
    // B2.2 - Leader giao ca: Leader chính nghỉ, Leader dự phòng làm thay, giảm 10%
    if(b.leaderOnLeave) rev = rev * 0.9;
    // B2.2 - Leader dỗi: giảm 30% 1 ngày, qua ngày sau hết dỗi
    if(b.leaderAngry){ rev = rev * 0.7; b.leaderAngry = false; logEvent('Leader '+b.leaderName+' đang dỗi nên doanh thu chi nhánh '+b.provinceName+' giảm 30%.'); }
    // B2.2 - Thời tiết: Mưa thì chi nhánh bán offline ít hơn
    if(gameState.weather==='mua') rev = rev * 0.7;
    if(gameState.weather==='nang') rev = rev * 1.1;
    rev = Math.round(rev);
    gameState.cash += rev;
    rev = Math.round(rev);
    gameState.cash += rev;
    b.revenueTotal = (b.revenueTotal||0) + rev;
    b.expenseTotal = (b.expenseTotal||0) + expense;
    gameState.branchRevenueTotal = (gameState.branchRevenueTotal||0) + rev;
    gameState.branchDailyRevenue = (gameState.branchDailyRevenue||0) + rev;
    gameState.dailyRevenue = (gameState.dailyRevenue||0) + rev;
  });
}
function leaderResignRequest(b){
  // Lý do nghỉ phải khớp giới tính, nữ thì không có "vợ sắp sinh"
  let lyDo = '';
  if(b.leaderGender==='Nu' || b.leaderGender==='Female' || b.leaderGender==='nu'){
    let dsNu=['con nhỏ ốm','sắp sinh','sắp cưới','bố mẹ ốm'];
    lyDo = dsNu[Math.floor(Math.random()*dsNu.length)];
  } else {
    let dsNam=['vợ sắp sinh','con nhỏ ốm','bố mẹ ốm','sắp cưới'];
    lyDo = dsNam[Math.floor(Math.random()*dsNam.length)];
  }
  let dongY = confirm('Leader '+b.leaderName+' xin nghỉ 1 ngày vì '+lyDo+'.\nBấm OK = Đồng ý giao ca cho Leader dự phòng\nBấm Cancel = Từ chối, Leader ở lại làm nhưng sẽ dỗi');
  if(dongY){
    b.leaderOnLeave = true;
    b.leaderBackup = 'Leader dự phòng';
    logEvent('Leader '+b.leaderName+' nghỉ 1 ngày, giao ca cho '+b.leaderBackup+' tại '+b.provinceName+'.');
  } else {
    b.leaderAngry = true;
    logEvent('Leader '+b.leaderName+' bị từ chối nghỉ nên đang dỗi, doanh thu giảm 30% hôm nay.');
  }
}
function renderBranches(){
  const container=document.getElementById('branchList'); if(!container) return;
  container.innerHTML='';
  gameState.branches.forEach(b=>{
    let card=document.createElement('div'); card.className='control-card branch-card';
    card.style.flexDirection='column'; card.style.alignItems='stretch';
    card.innerHTML='<div><div class="card-title">'+b.provinceName+' - Đang hoạt động</div><div class="card-desc">'+(b.leader?'Leader '+b.leaderName+' đang quản lý chi nhánh '+b.provinceName:'Chưa có Leader - Chi nhánh đang trống, cần thuê Leader')+' | Doanh thu đã báo về: '+formatVND(b.revenueTotal)+' | Chi phí: '+formatVND(b.expenseTotal)+'</div></div><div class="import-actions">'+(b.leader?'<span style="font-size:11px;color:#6ee7b7;font-weight:bold">Đang quản lý</span>':'<button onclick="hireBranchLeader(\''+b.provinceName+'\')" class="btn-branch-hire">Thuê Leader 4Tr</button>')+'</div>'+(!b.leader?'<div class="cost-preview">Chưa có Leader nên chưa có doanh thu. Hãy bấm Thuê Leader.</div>':'');
    container.appendChild(card);
  });
  provincesList.forEach(prov=>{
    if(gameState.branches.find(b=>b.provinceName===prov.name)) return;
    let card=document.createElement('div'); card.className='control-card';
    card.innerHTML='<div><div class="card-title">'+prov.name+'</div><div class="card-desc">'+prov.desc+' • Buff x'+prov.advX+' | Mở chi nhánh nhận 100Tr | Thuế đất/tháng: '+formatVND(prov.priceM2*80)+'</div></div><button onclick="openBranch(\''+prov.name+'\')" class="btn-open-branch">Mở chi nhánh</button>';
    container.appendChild(card);
  });
  document.getElementById('branchCountLabel').innerText=gameState.branches.length+' / 63';
  document.getElementById('branchTotalRevLabel').innerText=formatVND(gameState.branchRevenueTotal);
}
function getQty(id){ return qtyMap[id]||1; }
function changeQty(id, delta){ let q=getQty(id)+delta; if(q<1) q=1; if(q>100) q=100; qtyMap[id]=q; let inp=document.getElementById('qty-input-'+id); if(inp) inp.value=q; updateCostPreview(id); }
function setQtyInput(id, val){ let q=parseInt(val)||1; if(q<1) q=1; if(q>100) q=100; qtyMap[id]=q; updateCostPreview(id); }
function updateCostPreview(id){ let p=gameState.products.find(x=>x.id===id); if(!p) return; let q=getQty(id); let el=document.getElementById('cost-preview-'+id); if(!el) return; let costLe=p.cost*q; let costSi=Math.floor(p.cost*0.9)*10; el.innerHTML='Nhập <b>'+q+'</b> cái = <b>'+formatVND(costLe)+'</b> | Sỉ 10 = <b>'+formatVND(costSi)+'</b> (giảm 10%) - Tiền của bạn: <b>'+formatVND(gameState.cash)+'</b>'; }
function importProduct(id, quantity){
  let p=gameState.products.find(x=>x.id===id); let total=p.cost*quantity;
  if(gameState.cash < total){ playSound('error'); showGameDialog('Không đủ tiền. Cần '+formatVND(total)+' mà bạn chỉ có '+formatVND(gameState.cash)+'.', 'Nhập hàng'); return; }
  gameState.cash-=total; gameState.totalCostSpent+=total; p.stock+=quantity; updateUI(); filterProducts(); playSound('buy'); logEvent('Nhập kho '+quantity+' '+p.name+' ('+formatVND(total)+')');
}
function importWholesale(id){
  let p=gameState.products.find(x=>x.id===id); let per=Math.floor(p.cost*0.9); let total=per*10;
  if(gameState.cash < total){ playSound('error'); showGameDialog('Nhập sỉ cần '+formatVND(total)+', bạn chỉ có '+formatVND(gameState.cash)+'.', 'Nhập sỉ'); return; }
  showConfirmDialog('Nhập SỈ 10 cái '+p.name+'?\nGiá sỉ: '+formatVND(per)+'/cái (giảm 10%)\nTổng: '+formatVND(total), 'Nhập sỉ', ()=>{
    gameState.cash-=total; gameState.totalCostSpent+=total; p.stock+=10; updateUI(); filterProducts(); playSound('buy'); logEvent('Nhập SỈ 10 '+p.name+' - Tiết kiệm '+formatVND(p.cost*10-total));
  });
}
function importCustom(id){ importProduct(id, getQty(id)); }
let staffSkillMap={
  'director':'Điều hành siêu thị, duyệt kế hoạch, quyết định mở chi nhánh',
  'biz_manager':'Lên kế hoạch bán hàng, theo dõi doanh thu, chạy chương trình sale',
  'warehouse_manager':'Quản lý kho tổng, kiểm tồn kho, duyệt nhập hàng',
  'hr_manager':'Tuyển người, chấm công, xử lý xin nghỉ, đào tạo nhân viên mới',
  'finance_manager':'Quản lý tiền, thuế, vay ngân hàng, báo cáo lãi lỗ',
  'sales_staff':'Tư vấn máy, giới thiệu sản phẩm, chốt đơn cho khách',
  'cashier_staff':'Tính tiền, thối tiền, in hoá đơn, quét mã POS',
  'warehouse_staff':'Nhập kho, kiểm kho, đóng gói đơn Online, sắp xếp hàng',
  'shipper':'Giao hàng Online, thu tiền COD, xác nhận đã giao',
  'tech_staff':'Sửa máy, bảo hành, kiểm tra lỗi, tư vấn kỹ thuật',
  'cskh':'Nghe điện thoại, trả lời khách Online, xử lý khiếu nại, xin đánh giá',
  'security':'Canh cửa, trông xe, kiểm tra camera, giữ an ninh',
  'cleaner':'Lau dọn cửa hàng, dọn kho, giữ quầy sạch để khách thích'
};
function hireStaffMember(key){
  let st=gameState.staff.find(x=>x.key===key);
  if(gameState.isShopOpen){ showGameDialog('Đang trong ca bán, không tuyển được! Đóng ca rồi mới tuyển nhé.', 'Đang bán hàng'); return; }
  if(st.tier==='supermarket' && gameState.tier!=='supermarket'){ showGameDialog('Vị trí này chỉ mở khi lên Siêu thị.', 'Tuyển nhân sự'); return; }
  if(!gameState.staffMembers) gameState.staffMembers=[];
  let daCo=gameState.staffMembers.filter(x=>x.roleKey===key).length;
  if(daCo>=2){ showGameDialog('Vị trí '+st.name+' đã đủ 2 người. Cho 1 người nghỉ thì mới thuê lại được.', 'Đã đủ người'); return; }
  let maxTong = gameState.tier==='supermarket'?20:10;
  if(gameState.staffMembers.length>=maxTong){ showGameDialog('Cửa hàng đã đủ '+maxTong+' người, quá tải rồi! Cho 1 người nghỉ thì mới thuê lại được.', 'Quá tải'); return; }
  let fee=st.salary*1.5;
  if(gameState.cash < fee){ playSound('error'); showGameDialog('Không đủ tiền tuyển ('+formatVND(fee)+').', 'Tuyển nhân sự'); return; }
  let tenNam=['Quốc Bảo','Đức Anh','Hoàng Nam','Tuấn Kiệt','Gia Huy','Minh Quân','Hữu Phúc'];
  let tenNu=['Minh Anh','Thu Hằng','Phương Linh','Khánh Vy','Lan Anh','Thảo Nguyên','Ngọc Ánh'];
  let laNu=Math.random()<0.5;
  let ten=(laNu?tenNu:tenNam)[Math.floor(Math.random()*7)];
  let ranks=['D','C','B','A','S'];
  let rank=ranks[Math.floor(Math.random()*ranks.length)];
  gameState.cash-=fee;
  gameState.staffMembers.push({id:Date.now()+Math.random(), name:ten, gender:laNu?'nu':'nam', roleKey:key, roleName:st.name, rank:rank, spirit:100, skill:staffSkillMap[key]||'Làm việc theo phân công', salary:st.salary});
  st.count++;
  updateUI(); renderStaffTab(); renderAttendanceTab(); playSound('buy');
  logEvent('Tuyển: '+(laNu?'chị ':'anh ')+ten+' - '+st.name+' | Cấp '+rank+' | Việc: '+staffSkillMap[key]);
}
function fireStaffMember(key){
  let list=gameState.staffMembers.filter(x=>x.roleKey===key);
  if(list.length<=0){ showGameDialog('Chưa có nhân viên để cho nghỉ.', 'Nhân sự'); return; }
  let nv=list[0];
  showConfirmDialog('Cho '+(nv.gender==='nu'?'chị ':'anh ')+nv.name+' ('+nv.roleName+' - Cấp '+nv.rank+') nghỉ?\n- Lương giảm '+formatVND(nv.salary)+'\n- Slot trống để thuê người mới', 'Cho nghỉ', ()=>{
    gameState.staffMembers=gameState.staffMembers.filter(x=>x.id!==nv.id);
    let st=gameState.staff.find(x=>x.key===key); st.count--;
    updateUI(); renderStaffTab(); renderAttendanceTab(); playSound('error');
    logEvent('Cho nghỉ: '+nv.name+' ('+nv.roleName+') - Đã trống 1 slot để thuê lại.');
    adjustRating(-0.05, 'Cho nghỉ '+nv.name);
  });
}
function restStaffMember(id){
  let nv=gameState.staffMembers.find(x=>x.id===id); if(!nv) return;
  if(nv.spirit>=100){ showGameDialog(nv.name+' đang khỏe, không cần nghỉ!', 'Nghỉ ngơi'); return; }
  nv.spirit=100;
  logEvent('💤 '+(nv.gender==='nu'?'Chị ':'Anh ')+nv.name+' đã nghỉ ngơi, tinh thần hồi lại 100!');
  updateUI(); renderStaffTab(); renderAttendanceTab();
  showGameDialog(nv.name+' đã nghỉ ngơi xong, tinh thần 100, làm việc lại ngon rồi!', 'Nghỉ ngơi');
}
function renderStaffTab(){
  const container=document.getElementById('staffListContainer'); if(!container) return;
  container.innerHTML='';
  let badge=document.getElementById('staffTierBadge'); if(badge) badge.innerText = gameState.tier==='store' ? 'Cửa hàng: Tối đa 10 người - Mỗi vị trí 2 người' : 'Siêu thị: Tối đa 20 người - Mỗi vị trí 2 người';
  let hint=document.getElementById('staffLockHint'); if(hint) hint.style.display = gameState.tier==='store' ? 'block' : 'none';
  gameState.staff.forEach(st=>{
    let locked = st.tier==='supermarket' && gameState.tier!=='supermarket';
    let ds=(gameState.staffMembers||[]).filter(x=>x.roleKey===st.key);
    if(ds.length===0){
      let card=document.createElement('div');
      card.style.cssText='background:#1e293b;border:1px solid #334155;border-radius:16px;padding:12px;margin-bottom:10px;color:#fff';
      card.innerHTML='<div style="display:flex;justify-content:space-between;align-items:center"><b style="font-size:16px;color:#fff">'+st.name+'</b><span style="background:#334155;color:#cbd5e1;padding:2px 10px;border-radius:99px;font-size:12px;font-weight:800">Chưa có cấp</span></div>'
      +'<div style="margin:8px 0"><span style="background:#334155;color:#cbd5e1;padding:3px 10px;border-radius:99px;font-size:12px">⚪ Chưa thuê</span></div>'
      +'<div style="background:#0f172a;border:1px solid #334155;border-radius:99px;padding:6px 10px;font-size:13px;color:#fff">💼 Lương '+formatVND(st.salary)+'/tháng</div>'
      +'<div id="detail-role-'+st.key+'" style="display:none;background:#0f172a;border:1px solid #334155;border-radius:10px;padding:10px;margin-top:10px;font-size:13px;line-height:1.5;color:#cbd5e1">'+(staffSkillMap[st.key]||'')+'<br><br>Lương: '+formatVND(st.salary)+'/tháng<br>Phí tuyển: '+formatVND(st.salary*1.5)+'</div>'
      +'<div style="display:flex;justify-content:flex-end;margin-top:10px;gap:8px"><button onclick="toggleStaffDetail(\'detail-role-'+st.key+'\', this)" style="border:1px solid #334155;border-radius:99px;padding:6px 14px;background:#0f172a;color:#fff">ℹ️ Chi tiết</button><button onclick="hireStaffMember(\''+st.key+'\')" '+(locked||gameState.isShopOpen?'disabled':'')+' style="background:linear-gradient(135deg,#22c55e,#0ea5e9);color:#fff;border:none;padding:8px 18px;border-radius:12px;font-weight:800">'+(locked?'Lên Siêu thị':(gameState.isShopOpen?'Đang bán - Khoá':formatVND(st.salary*1.5)+' Thuê'))+'</button></div>';
      container.appendChild(card);
      return;
    }
    ds.forEach(nv=>{
      let capStyle=nv.rank==='S'?'background:#22c55e;color:#fff':nv.rank==='A'?'background:#0ea5e9;color:#fff':nv.rank==='B'?'background:#6366f1;color:#fff':'background:#64748b;color:#fff';
      let mauTinh=nv.spirit<30?'#f87171':(nv.spirit<70?'#fbbf24':'#6ee7b7');
      let card=document.createElement('div');
      card.style.cssText='background:#1e293b;border:1px solid #334155;border-radius:16px;padding:12px;margin-bottom:10px;color:#fff';
      card.innerHTML='<div style="display:flex;justify-content:space-between;align-items:center"><b style="font-size:16px;color:#fff">'+(nv.gender==='nu'?'Chị ':'Anh ')+nv.name+'</b><span style="padding:2px 10px;border-radius:99px;font-size:12px;font-weight:800;'+capStyle+'">Cấp '+nv.rank+'</span></div>'
      +'<div style="margin:8px 0;display:flex;gap:6px;flex-wrap:wrap"><span style="background:#14532d;color:#bbf7d0;padding:3px 10px;border-radius:99px;font-size:12px">🟢 Đang làm</span><span style="background:#0f172a;border:1px solid #334155;color:#fff;padding:3px 10px;border-radius:99px;font-size:12px">Tinh thần <b style="color:'+mauTinh+'">'+nv.spirit+'</b></span></div>'
      +'<div style="background:#0f172a;border:1px solid #334155;border-radius:99px;padding:6px 10px;font-size:13px;color:#fff">💼 Lương '+formatVND(nv.salary)+'/tháng</div>'
      +'<div id="detail-member-'+nv.id+'" style="display:none;background:#0f172a;border:1px solid #334155;border-radius:10px;padding:10px;margin-top:10px;font-size:13px;line-height:1.5;color:#cbd5e1">'+nv.skill+'<br><br>Cấp: '+nv.rank+'<br>Tinh thần: '+nv.spirit+'<br>Lương: '+formatVND(nv.salary)+'/tháng</div>'
      +'<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:10px">'
      +'<button onclick="toggleStaffDetail(\'detail-member-'+nv.id+'\', this)" style="border:1px solid #334155;border-radius:99px;padding:6px 14px;background:#0f172a;color:#fff">ℹ️ Chi tiết</button>'
      +(nv.spirit<30?'<button onclick="restStaffMember('+nv.id+')" style="background:#0ea5e9;color:#fff;border:none;padding:8px 14px;border-radius:12px;font-weight:800">💤 Nghỉ ngơi</button>':'')
      +'<button onclick="fireStaffMember(\''+st.key+'\')" style="background:#334155;color:#fff;border:1px solid #475569;padding:8px 14px;border-radius:12px;font-weight:800">✓ Cho nghỉ</button>'
      +'</div>';
      container.appendChild(card);
    });
    if(ds.length===1 && !locked){
      let btn=document.createElement('button');
      btn.innerText=gameState.isShopOpen?'Đang bán - Khoá':'+ Thuê thêm 1 '+st.name;
      btn.disabled=gameState.isShopOpen;
      btn.style.cssText='width:100%;padding:8px;border-radius:12px;background:linear-gradient(135deg,#22c55e,#0ea5e9);color:#fff;font-weight:800;border:none;margin-bottom:10px';
      btn.onclick=()=>hireStaffMember(st.key);
      container.appendChild(btn);
    }
  });
}
function toggleStaffDetail(id, btn){
  let el=document.getElementById(id); if(!el) return;
  let isOpen = el.style.display==='block';
  el.style.display = isOpen ? 'none' : 'block';
  if(btn) btn.innerText = isOpen ? 'ℹ️ Chi tiết' : '🔼 Thu gọn';
}
const attendanceIncidentPool=[
 {name:'NV Bán hàng đi muộn 15 phút', desc:'Cần chủ bấm chấm công để xác nhận đi muộn, trừ 50k lương', msg:'Đã xác nhận đi muộn, đã trừ lương.', money:0, rating:0},
 {name:'NV Kho quên chấm công', desc:'Chưa chấm vào ca sáng, bấm chấm công để ghi nhận', msg:'Đã chấm công cho NV Kho, +50k thưởng chuyên cần.', money:50000, rating:0},
 {name:'NV Bảo vệ xin nghỉ đột xuất', desc:'Bấm chấm công để duyệt nghỉ, không bị trừ sao', msg:'Đã duyệt nghỉ cho Bảo vệ, không bị trừ sao.', money:0, rating:0},
 {name:'NV Thu ngân đến sớm', desc:'Đến sớm 30 phút để mở quầy, thưởng nóng', msg:'NV Thu ngân đến sớm, +30k thưởng.', money:30000, rating:0},
 {name:'NV CSKH bị khách phàn nàn', desc:'Khách chê trả lời chậm, cần nhắc nhở', msg:'Đã nhắc nhở NV CSKH, khách hài lòng hơn.', money:0, rating:0.05},
 {name:'NV Lao công quên dọn kho', desc:'Kho bừa bộn, khách chê bẩn', msg:'Đã nhắc NV Lao công dọn kho, bị trừ 20k.', money:-20000, rating:-0.05},
 {name:'NV Shipper giao hàng trễ', desc:'Giao trễ 20 phút, khách đòi hoàn hàng', msg:'Đã xin lỗi khách, Shipper bị trừ 30k.', money:-30000, rating:-0.05},
 {name:'NV Kỹ thuật sửa lỗi chậm', desc:'Sửa máy cho khách chậm, khách bực', msg:'Đã động viên NV Kỹ thuật làm nhanh hơn.', money:0, rating:-0.05},
 {name:'NV Bán hàng quên mặc đồng phục', desc:'Không mặc đồng phục, bị trừ thi đua', msg:'Đã nhắc NV Bán hàng mặc đồng phục.', money:0, rating:0},
 {name:'NV Kho làm vỡ 1 hộp hàng', desc:'Làm vỡ hàng khi nhập kho', msg:'NV Kho làm vỡ hàng, trừ 100k tiền hàng.', money:-100000, rating:-0.1},
 {name:'NV Bán hàng chốt được đơn lớn', desc:'Chốt đơn 50Tr, xứng đáng thưởng', msg:'NV Bán hàng chốt đơn lớn, +100k thưởng!', money:100000, rating:0.1},
 {name:'NV Thu ngân thối nhầm tiền', desc:'Thối thừa 50k cho khách', msg:'Đã bù tiền thối nhầm, trừ 50k.', money:-50000, rating:-0.05}
];
function renderAttendanceTab(){
  const container=document.getElementById('attendanceListContainer');
  if(!container) return;
  let total=gameState.staff.reduce((s,x)=>s+x.count,0);
  document.getElementById('staffCount').innerText=total+' người';
  if(total===0){ container.innerHTML='<div class="summary-box"><div class="font-bold text-amber-400">Chưa có nhân viên để chấm công. Hãy tuyển nhân viên trước!</div></div>'; return; }
  if(!gameState.attendanceResolved) gameState.attendanceResolved=[];
  if(!gameState.attendanceIncidents || gameState.attendanceIncidents.length===0){
    let idxs=attendanceIncidentPool.map((_,i)=>i);
    for(let i=idxs.length-1;i>0;i--){ let j=Math.floor(Math.random()*(i+1)); let t=idxs[i]; idxs[i]=idxs[j]; idxs[j]=t; }
    gameState.attendanceIncidents=idxs.slice(0,3);
  }
  let done=gameState.attendanceResolved.length;
  let html='<div class="summary-box"><div class="font-bold text-emerald-400">Đã xử lý: '+done+'/3 sự cố | '+total+' nhân sự</div></div>';
  gameState.attendanceIncidents.forEach((poolIdx,idx)=>{
    let inc=attendanceIncidentPool[poolIdx];
    let isDone=gameState.attendanceResolved.includes(idx);
    let btn=isDone?'<button class="btn-cyan" disabled style="opacity:.5;background:#059669">Đã chấm ✓</button>':'<button onclick="resolveAttendance('+idx+')" class="btn-cyan">Chấm công</button>';
    let timeTxt=isDone?'<div class="card-desc">Đã xử lý lúc '+String(gameState.currentHour).padStart(2,'0')+':'+String(gameState.gameMinute||0).padStart(2,'0')+'</div>':'';
    html+='<div class="control-card"><div><div class="card-title">'+inc.name+'</div><div class="card-desc">'+inc.desc+'</div>'+timeTxt+'</div>'+btn+'</div>';
  });
  container.innerHTML=html;
}
function resolveAttendance(idx){
  if(!gameState.attendanceResolved) gameState.attendanceResolved=[];
  if(gameState.attendanceResolved.includes(idx)) return;
  let poolIdx=gameState.attendanceIncidents[idx];
  let inc=attendanceIncidentPool[poolIdx];
  if(inc.money!==0) gameState.cash+=inc.money;
  if(inc.rating!==0) adjustRating(inc.rating, inc.name);
  gameState.attendanceResolved.push(idx);
  logEvent('Chấm công: '+inc.msg);
  updateUI();
  renderAttendanceTab();
  showGameDialog(inc.msg, 'Chấm công');
}
function takeLoan(id){
  let loan=bankLoansList.find(x=>x.id===id);
  if(gameState.day < loan.minDay){ showGameDialog('Gói này mở ngày '+loan.minDay+', bạn đang ngày '+gameState.day+'.', 'MD Bank'); return; }
  gameState.cash+=loan.amount; gameState.loansActive.push(loan); updateUI(); playSound('cash'); logEvent('Giải ngân '+loan.name+': +'+formatVND(loan.amount));
}
function payRentAndTaxes(){
  let rent=gameState.storeAreaM2*gameState.selectedProvince.priceM2; let branchRent=gameState.branches.reduce((s,b)=>s+b.priceM2*80,0); let tax=5000000; let total=rent+branchRent+tax;
  if(gameState.cash < total){ playSound('error'); showGameDialog('Không đủ tiền đóng ('+formatVND(total)+').', 'Thuế & Phí'); return; }
  gameState.cash-=total; gameState.totalTaxPaid+=total; updateUI(); playSound('cash'); logEvent('Đóng thuê + thuế: '+formatVND(total)+' (CN: '+formatVND(branchRent)+')'); showGameDialog('Đã đóng '+formatVND(total)+'.', 'Thuế & Phí');
}
function renderProvincesScrollList(){
  const container=document.getElementById('provincesScrollList'); if(!container) return;
  container.innerHTML='';
  provincesList.forEach(prov=>{
    let isSel=prov.name===gameState.selectedProvince.name;
    let card=document.createElement('div'); card.className='control-card';
    card.innerHTML='<div><div class="card-title">'+prov.name+' '+(isSel?'(Đang hoạt động)':'')+'</div><div class="card-desc">'+prov.desc+' • Buff x'+prov.advX+' | Thuê: '+prov.priceM2.toLocaleString('vi-VN')+'đ/m²</div></div><button onclick="selectProvince(\''+prov.name+'\')" class="'+(isSel?'btn-emerald':'btn-cyan')+'">'+(isSel?'Hiện tại':'Chọn')+'</button>';
    container.appendChild(card);
  });
}
function selectProvince(name){ gameState.selectedProvince=provincesList.find(p=>p.name===name); renderProvincesScrollList(); updateUI(); playSound('upgrade'); logEvent('Chuyển siêu thị sang '+name+' (Buff x'+gameState.selectedProvince.advX+')'); }

function renderUpgrades(){
  const container=document.getElementById('upgradesList'); if(!container) return;
  container.innerHTML='';
  gameState.upgrades.forEach(u=>{
    let card=document.createElement('div'); card.className='control-card';
    let ownedText='Sở hữu: '+u.owned+'/'+u.maxOwned+' | Lv: '+u.level+'/'+u.maxLevel;
    let nextCost=Math.floor(u.cost * (1 + u.level*0.15));
    let capNote = gameState.day<30 ? ' (Trước ngày 30 max Lv30 - Bạn đang ngày '+gameState.day+')' : ' (Đã mở full Lv100)';
    let action='';
    if(u.owned===0) action='<button onclick="buyOwnUpgrade(\''+u.id+'\')" class="btn-own">Sở hữu - '+formatVND(u.cost)+'</button><div class="upgrade-meta">Chưa sở hữu → chưa nâng Lv được</div>';
    else if(u.owned < u.maxOwned) action='<button onclick="buyMoreUpgrade(\''+u.id+'\')" class="btn-own">+ Mua thêm ('+u.owned+'/'+u.maxOwned+') - '+formatVND(u.cost)+'</button><button onclick="upgradeLevel(\''+u.id+'\')" class="btn-upgrade-lv" '+(u.level>=u.maxLevel?'disabled':'')+'>Nâng cấp Lv '+u.level+' → '+(u.level+1)+' - '+formatVND(nextCost)+'</button>';
    else action='<button class="btn-own" disabled>Đã đủ '+u.maxOwned+'/'+u.maxOwned+'</button><button onclick="upgradeLevel(\''+u.id+'\')" class="btn-upgrade-lv" '+(u.level>=u.maxLevel?'disabled':'')+'>Nâng cấp Lv '+u.level+' → '+(u.level+1)+' - '+formatVND(nextCost)+'</button>';
    if(u.level>=u.maxLevel) action+='<div class="upgrade-meta">Đã MAX Lv100</div>';
    card.innerHTML='<div><div class="card-title">'+u.name+'</div><div class="card-desc">'+u.desc+'</div><div class="upgrade-meta"><b>'+ownedText+'</b>'+capNote+'</div></div><div class="upgrade-actions">'+action+'</div>';
    container.appendChild(card);
  });
}
function buyOwnUpgrade(id){
  let u=gameState.upgrades.find(x=>x.id===id);
  if(u.owned>0){ showGameDialog('Đã sở hữu rồi.', 'Nâng cấp'); return; }
  if(gameState.cash < u.cost){ playSound('error'); showGameDialog('Không đủ tiền.', 'Nâng cấp'); return; }
  gameState.cash-=u.cost; u.owned=1; u.level=1; if(u.id==='store_size') gameState.storeAreaM2+=50;
  updateUI(); renderUpgrades(); playSound('upgrade'); logEvent('Sở hữu: '+u.name+' (1/'+u.maxOwned+' | Lv 1)'); adjustRating(0.05, 'Sở hữu '+u.name);
}
function buyMoreUpgrade(id){
  let u=gameState.upgrades.find(x=>x.id===id);
  if(u.owned===0){ showGameDialog('Chưa sở hữu. Hãy bấm Sở hữu trước.', 'Nâng cấp'); return; }
  if(u.owned>=u.maxOwned){ showGameDialog('Đã đủ số lượng.', 'Nâng cấp'); return; }
  if(gameState.cash < u.cost){ playSound('error'); showGameDialog('Không đủ tiền.', 'Nâng cấp'); return; }
  gameState.cash-=u.cost; u.owned++; if(u.id==='store_size') gameState.storeAreaM2+=50;
  updateUI(); renderUpgrades(); playSound('upgrade'); logEvent('Mua thêm '+u.name+' ('+u.owned+'/'+u.maxOwned+')');
}
function upgradeLevel(id){
  let u=gameState.upgrades.find(x=>x.id===id);
  if(u.owned===0){ playSound('error'); showGameDialog('Chưa sở hữu thì chưa nâng cấp được. Hãy bấm Sở hữu trước.', 'Nâng cấp'); return; }
  if(gameState.day < 30 && u.level >= 30){ playSound('error'); showGameDialog('Trước ngày 30 chỉ nâng tối đa Lv30 thôi.\nBạn đang ngày '+gameState.day+', Lv '+u.level+'. Qua ngày 30 mới lên Lv100 được.', 'Giới hạn Lv'); return; }
  if(u.level>=100){ showGameDialog('Đã MAX Lv100.', 'Nâng cấp'); return; }
  let cost=Math.floor(u.cost * (1 + u.level*0.15));
  if(gameState.cash < cost){ playSound('error'); showGameDialog('Không đủ tiền nâng Lv. Cần '+formatVND(cost)+'.', 'Nâng cấp'); return; }
  gameState.cash-=cost; u.level++; updateUI(); renderUpgrades(); playSound('upgrade'); logEvent('Nâng cấp '+u.name+' lên Lv '+u.level+'/100'); adjustRating(0.08, 'Nâng cấp '+u.name+' Lv '+u.level);
}

function initChipsFilters(){ renderCategoryChips(); renderBrandChips(); renderSegmentChips(); }
function renderCategoryChips(){ const c=document.getElementById('categoryChipsContainer'); if(!c) return; c.innerHTML=''; ['all','Điện thoại','Laptop','Máy tính bảng','Đồng hồ','Tai nghe','Loa','Phụ kiện','TV','Điện lạnh','Gia dụng'].forEach(cat=>{ let b=document.createElement('button'); b.className='filter-chip '+(gameState.selectedCategory===cat?'active-chip':''); b.innerText=cat==='all'?'Tất cả':cat; b.onclick=()=>{gameState.selectedCategory=cat; gameState.selectedBrand='all'; renderCategoryChips(); renderBrandChips(); filterProducts();}; c.appendChild(b); }); }
function renderBrandChips(){
  const c=document.getElementById('brandChipsContainer');
  if(!c) return;
  c.innerHTML='';
  let brands=['all'];
  gameState.products.forEach(p=>{
    if(gameState.selectedCategory!=='all' && p.category!==gameState.selectedCategory) return;
    if(!brands.includes(p.brand)) brands.push(p.brand);
  });
  brands.forEach(br=>{
    let b=document.createElement('button');
    b.className='filter-chip '+(gameState.selectedBrand===br?'active-chip':'');
    b.innerText=br==='all'?'Tất cả Hãng':br;
    b.onclick=()=>{gameState.selectedBrand=br; renderBrandChips(); filterProducts();};
    c.appendChild(b);
  });
}
function renderSegmentChips(){ const c=document.getElementById('segmentChipsContainer'); if(!c) return; c.innerHTML=''; ['all','Cao cấp','Trung cấp','Phổ thông'].forEach(seg=>{ let b=document.createElement('button'); b.className='filter-chip '+(gameState.selectedSegment===seg?'active-chip':''); b.innerText=seg==='all'?'Tất cả Phân khúc':seg; b.onclick=()=>{gameState.selectedSegment=seg; renderSegmentChips(); filterProducts();}; c.appendChild(b); }); }

function filterProducts(){
  const container=document.getElementById('productList'); if(!container) return; container.innerHTML='';
  let filtered=gameState.products.filter(p=>{
    if(gameState.selectedCategory!=='all' && p.category!==gameState.selectedCategory) return false;
    if(gameState.selectedBrand!=='all' && p.brand!==gameState.selectedBrand) return false;
    if(gameState.selectedSegment!=='all' && p.segment!==gameState.selectedSegment) return false;
    return true;
  });
  filtered.forEach(p=>{
    let q=getQty(p.id); let costLe=p.cost*q; let costSi=Math.floor(p.cost*0.9)*10;
    let card=document.createElement('div'); card.className='control-card'; card.style.flexDirection='column'; card.style.alignItems='stretch';
    card.innerHTML='<div style="display:flex;justify-content:space-between;align-items:center"><div><div class="card-title">'+p.brand+' - '+p.name+'</div><div class="card-desc">Sỉ: '+formatVND(p.cost)+' | Tồn: '+p.stock+' | Giá bán: '+formatVND(p.price)+' | '+p.category+'</div></div></div><div class="qty-control"><button class="qty-btn" onclick="changeQty(\''+p.id+'\',-1)">-</button><input id="qty-input-'+p.id+'" class="qty-input" type="number" value="'+q+'" min="1" max="100" onchange="setQtyInput(\''+p.id+'\',this.value)"><button class="qty-btn" onclick="changeQty(\''+p.id+'\',1)">+</button><span style="font-size:10px;color:#fde68a">cái</span></div><div id="cost-preview-'+p.id+'" class="cost-preview">Nhập <b>'+q+'</b> cái = <b>'+formatVND(costLe)+'</b> | Sỉ 10 = <b>'+formatVND(costSi)+'</b> (giảm 10%) - Tiền: <b>'+formatVND(gameState.cash)+'</b></div><div class="import-actions"><button onclick="importWholesale(\''+p.id+'\')" class="btn-import-wholesale">Nhập SỈ 10 (-10%)</button><button onclick="importCustom(\''+p.id+'\')" class="btn-import-custom">Nhập '+q+' cái</button></div>';
    container.appendChild(card);
  });
}
function switchTab(tabName, evt){
  document.querySelectorAll('#tab-inventory, #tab-staff, #tab-attendance, #tab-startup, #tab-bank, #tab-upgrades, #tab-branch, #tab-finance, #tab-summary, #tab-online',).forEach(el=>el.classList.add('hidden'));
  document.querySelectorAll('.feature-icon-btn').forEach(b=>b.classList.remove('active-tab-feat'));
  const t=document.getElementById('tab-'+tabName); if(t) t.classList.remove('hidden');
  onGuideButtonClicked(evt && evt.currentTarget ? evt.currentTarget.id : '');
  if(evt && evt.currentTarget) evt.currentTarget.classList.add('active-tab-feat');
  playSound('buy');
}
function updateUI(){
// ĐỒNG HỒ MỚI - CHẠY PHÚT, HIỆN Ở HEADER
var shiftEl=document.getElementById('shiftIndicator');
if(shiftEl){
  var hh=String(gameState.currentHour).padStart(2,'0');
  var mm=String(gameState.gameMinute||0).padStart(2,'0');
  var ca = gameState.currentHour < 15 ? 'Sáng' : 'Chiều/Tối';
  shiftEl.innerText='Ca: '+ca+' ('+hh+'h:'+mm+')';
}
  document.getElementById('cashVal').innerText=formatVND(gameState.cash);
  document.getElementById('revenueVal').innerText=formatVND(gameState.dailyRevenue);
  document.getElementById('ratingVal').innerText=gameState.rating.toFixed(1)+' sao';
  document.getElementById('footerRatingVal').innerText=gameState.rating.toFixed(1)+' sao';
  document.getElementById('ratingCountLabel').innerText='('+gameState.ratingCount+' đánh giá)';
  document.getElementById('ratingBarFill').style.width=(gameState.rating/5*100)+'%';
  let title=document.getElementById('brandTitle'); let badge=document.getElementById('tierBadge');
  if(gameState.tier==='supermarket'){ title.innerText='Siêu thị Thế giới công nghệ'; badge.innerText='SIÊU THỊ'; badge.className='badge-tier-market'; }
  else { title.innerText='Cửa hàng: Thế giới công nghệ'; badge.innerText='CỬA HÀNG'; badge.className='badge-tier-store'; }
  let tierBox=document.getElementById('tierUpgradeBox'); if(tierBox) tierBox.innerText = gameState.tier==='supermarket' ? 'Cấp hiện tại: SIÊU THỊ' : 'Cấp hiện tại: CỬA HÀNG';
  let tierDesc=document.getElementById('tierUpgradeDesc'); if(tierDesc) tierDesc.innerText = gameState.tier==='supermarket' ? 'Bạn đã lên Siêu thị rồi, giờ mở Chi nhánh để mở chuỗi toàn quốc.' : 'Lên Siêu thị cần: Ngày 15 (bạn đang '+gameState.day+'), Tiền 800Tr (bạn có '+formatVND(gameState.cash)+'), Đánh giá 4.0 (bạn đang '+gameState.rating.toFixed(1)+' sao)';
  let specialDesc=document.getElementById('specialUpgradeDesc'); if(specialDesc) specialDesc.innerText = gameState.tier==='supermarket' ? 'Đã lên Siêu thị. Giờ mở Chi nhánh để mở chuỗi toàn quốc.' : 'Cần: Ngày 15 (bạn đang '+gameState.day+') • Tiền 800Tr (bạn có '+formatVND(gameState.cash)+') • Đánh giá 4.0 sao (bạn đang '+gameState.rating.toFixed(1)+' sao)';
  let specialPanel=document.getElementById('specialSupermarketPanel'); if(specialPanel) specialPanel.style.display = gameState.tier==='supermarket' ? 'none' : 'flex';
  document.getElementById('locationLabel').innerText='📍 '+gameState.selectedProvince.name;
  document.getElementById('financeCurrentProvince').innerText=gameState.selectedProvince.name;
  document.getElementById('storeAreaVal').innerText=gameState.storeAreaM2+' m²';
  document.getElementById('liveCashScreen').innerText=formatVND(gameState.cash);
  let rent=gameState.storeAreaM2*gameState.selectedProvince.priceM2;
  document.getElementById('rentVal').innerText=formatVND(rent);
  let branchRent=gameState.branches.reduce((s,b)=>s+b.priceM2*80,0);
  document.getElementById('branchRentVal').innerText=formatVND(branchRent);
  document.getElementById('sumRevDetail').innerText=formatVND(gameState.totalRevenue - gameState.branchRevenueTotal);
  document.getElementById('sumBranchRevDetail').innerText=formatVND(gameState.branchRevenueTotal);
  document.getElementById('sumCostDetail').innerText=formatVND(gameState.totalCostSpent);
  let totalSalary=gameState.staff.reduce((s,x)=>s+(x.count*x.salary),0);
  gameState.totalSalaryPaid=totalSalary;
  document.getElementById('sumSalaryDetail').innerText=formatVND(totalSalary);
  document.getElementById('sumTaxDetail').innerText=formatVND(gameState.totalTaxPaid);
  let netProfit=gameState.totalRevenue-(gameState.totalCostSpent+totalSalary+gameState.totalTaxPaid);
  let netEl=document.getElementById('sumNetProfitDetail'); netEl.innerText=formatVND(netProfit); netEl.className=netProfit>=0?'text-emerald-400 font-bold':'text-rose-400 font-bold';
}
function saveGame(){
  let cu = JSON.parse(localStorage.getItem('techWorld3Saves')||'[]');
  cu.unshift(JSON.parse(JSON.stringify(gameState)));
  if(cu.length>3) cu = cu.slice(0,3);
  localStorage.setItem('techWorld3Saves', JSON.stringify(cu));
  localStorage.setItem('techWorldAutoSave', JSON.stringify(gameState));
  localStorage.setItem('techWorldStableSave', JSON.stringify(gameState));
  let label=document.getElementById('lastSaveLabel'); if(label) label.innerText='Lần cuối: Ngày '+gameState.day+' | Đã lưu '+cu.length+'/3 bản';
  playSound('upgrade'); showGameDialog('Đã lưu tiến trình. Đang giữ '+cu.length+'/3 bản gần nhất.', 'Sao lưu');
}
function restoreAutoSave(){
  let saved=localStorage.getItem('techWorldAutoSave') || localStorage.getItem('techWorldSimulatorSave');
  if(!saved){ showGameDialog('Chưa có bản tự lưu nào.', 'Khôi phục'); return; }
  try{ gameState=JSON.parse(saved); updateUI(); filterProducts(); renderStaffTab(); renderAttendanceTab(); renderUpgrades(); renderBranches(); closeSettingsModal(); playSound('upgrade'); showGameDialog('Đã khôi phục bản tự lưu.', 'Khôi phục'); }catch(e){ showGameDialog('Bản lưu không hợp lệ.', 'Khôi phục'); }
}
function loadGame(){ restoreAutoSave(); }
function exportSaveCode(){ let code=btoa(unescape(encodeURIComponent(JSON.stringify(gameState)))); document.getElementById('saveCodeInput').value=code; showGameDialog('Mã đã copy vào ô. Hãy lưu mã này lại.', 'Copy Mã'); }
function importSaveCode(){ let code=document.getElementById('saveCodeInput').value.trim(); if(!code){ showGameDialog('Hãy dán mã vào ô trước.', 'Khôi phục từ mã'); return; } try{ let decoded=JSON.parse(decodeURIComponent(escape(atob(code)))); gameState=decoded; updateUI(); filterProducts(); renderStaffTab(); renderAttendanceTab(); renderUpgrades(); renderBranches(); closeSettingsModal(); playSound('upgrade'); showGameDialog('Khôi phục thành công.', 'Khôi phục từ mã'); }catch(e){ showGameDialog('Mã không hợp lệ.', 'Khôi phục từ mã'); } }
function resetGame(){
  showConfirmDialog('Xóa toàn bộ dữ liệu và chơi lại từ đầu?', 'Chơi lại', ()=>{
    localStorage.removeItem('techWorldSimulatorSave'); localStorage.removeItem('techWorldAutoSave'); location.reload();
  });
}
function manualCloseShift(){
  stopGameLoop(); gameState.isShopOpen=false; updateOpenShopButtonState();
  let totalSalary=gameState.staff.reduce((s,x)=>s+(x.count*x.salary),0);
  let net=gameState.dailyRevenue-totalSalary;
  document.getElementById('modalSumRevenue').innerText='+'+formatVND(gameState.dailyRevenue);
  document.getElementById('modalBranchRevenue').innerText='+'+formatVND(gameState.branchDailyRevenue);
  document.getElementById('modalSumStaffSalary').innerText='-'+formatVND(totalSalary);
  let netEl=document.getElementById('modalSumNetProfit'); netEl.innerText=formatVND(net); netEl.className=net>=0?'text-emerald-400 font-bold':'text-rose-400 font-bold';
  document.getElementById('summaryModal').classList.remove('hidden');
}
function startNextShiftOrDay(){
  document.getElementById('summaryModal').classList.add('hidden');
  gameState.day++; gameState.dailyRevenue=0; gameState.branchDailyRevenue=0;
  let weathersB22=['nang','mua','mu'];
  gameState.weather=weathersB22[Math.floor(Math.random()*weathersB22.length)];
  if(gameState.weather==='mua') logEvent('Hôm nay trời mưa, khách tới cửa hàng ít hơn, bán Online nhiều hơn.');
  else if(gameState.weather==='nang') logEvent('Hôm nay trời nắng đẹp, khách tới cửa hàng đông hơn.');
  else logEvent('Hôm nay trời âm u, buôn bán bình thường.');
  gameState.branches.forEach(b=>{ if(b.leaderOnLeave){ b.leaderOnLeave=false; b.leaderBackup=''; logEvent('Leader '+b.leaderName+' đã quay lại làm việc tại '+b.provinceName+'.'); } });
  gameState.attendanceIncidents=[]; gameState.attendanceResolved=[]; gameState.gameMinute=0; gameState.currentHour=8;
  document.getElementById('dayCounter').innerText='Ngày '+gameState.day;
  if(gameState.rating < 2.5) adjustRating(0.1,'Ngày mới cố gắng cải thiện');
  updateUI(); renderBankLoans(); renderUpgrades(); renderBranches();
}
  // 3 KIEU: always = Luon bat, auto = Tu dong, off = Da tat
function getGuideMode(){ return gameState.guideMode || 'off'; }
function updateSettingsLabels(){
  let mode=getGuideMode();
  let label=mode==='always'?'Luôn bật':(mode==='auto'?'Tự động':'Đã tắt');
  document.getElementById('guideSettingLabel').innerText=label;
  let map={4:'4 phút = 10 phút thực',6:'6 phút = 20 phút thực',8:'8 phút = 30 phút thực'};
  document.getElementById('sellTimeLabel').innerText=map[gameState.sellTimeOption]||'4 phút = 10 phút thực';
}
function toggleGuideSetting(){
  let mode=getGuideMode();
  let next=mode==='always'?'auto':(mode==='auto'?'off':'always');
  gameState.guideMode=next;
  if(next==='off'){ clearGuideHighlight(); }
  if(next==='always'){ startGuide(); }
  if(next==='auto'){
    if(localStorage.getItem('techGuideDone')!=='1') startGuide();
  }
  updateSettingsLabels();
  showGameDialog('Chỉ dẫn từng bước: '+(next==='always'?'Luôn bật':(next==='auto'?'Tự động - Làm xong 1 vòng sẽ tự tắt':'Đã tắt')), 'Chỉ dẫn từng bước');
}
function startGuide(){
  let mode=getGuideMode();
  if(mode==='off') return;
  if(mode==='auto' && localStorage.getItem('techGuideDone')==='1') return;
  gameState.guideStep=0;
  showGuideStep(0);
}
function showGuideStep(idx){
  clearGuideHighlight();
  if(idx>=guideSteps.length){ clearGuideHighlight(); return; }
  let step=guideSteps[idx];
  gameState.guideStep=idx;
  let el=document.getElementById(step.target);
  if(!el) return;
  el.classList.add('guide-highlight');
  el.scrollIntoView({block:'center', behavior:'smooth'});
  let tip=document.getElementById('guideTooltip');
  if(tip) tip.classList.add('hidden');
}
function nextGuideStep(){
  let next=gameState.guideStep+1;
  if(next>=guideSteps.length){
    skipGuide();
    if(getGuideMode()==='auto'){
      localStorage.setItem('techGuideDone','1');
      gameState.guideMode='off';
      updateSettingsLabels();
    }
    showGameDialog('Xong hướng dẫn: Nhập hàng -> Nhân viên -> Nâng cấp -> Chấm công -> Kiểm tra tồn kho -> Mở bán. Từ giờ tự chơi nhé.', 'Hoàn thành hướng dẫn');
    return;
  }
  showGuideStep(next);
}
function skipGuide(){ clearGuideHighlight(); let tip=document.getElementById('guideTooltip'); if(tip) tip.classList.add('hidden'); }
function clearGuideHighlight(){ document.querySelectorAll('.guide-highlight').forEach(e=>e.classList.remove('guide-highlight')); }
function onGuideButtonClicked(targetId){
  if(getGuideMode()==='off') return;
  let cur=guideSteps[gameState.guideStep];
  if(cur && cur.target===targetId){
    setTimeout(()=>{ nextGuideStep(); }, 800);
  }
}
function openRestoreModal(){
  closeSettingsModal();
  let auto = JSON.parse(localStorage.getItem('techWorldAutoSave')||'null');
  let truoc = JSON.parse(localStorage.getItem('techWorldBeforeRestore')||'null');
  let ben = JSON.parse(localStorage.getItem('techWorldStableSave')||'null');
  let list = document.getElementById('restoreSlotList');
  function nut(ten, data){
    if(!data) return '<div style="padding:10px;border-radius:12px;background:#e5e7eb;color:#666">'+ten+' - Chưa có bản lưu</div>';
    return '<button onclick="restoreSlot(\''+ten+'\')" style="padding:12px;border-radius:12px;background:linear-gradient(135deg,#22c55e,#0ea5e9);color:#fff;font-weight:800">'+ten+' - Ngày '+data.day+' • '+formatVND(data.cash)+'</button>';
  }
  // Thay tên cho giống hình m gửi
  list.innerHTML = nut('Cuối ngày gần nhất', auto) + nut('Bản trước lần khôi phục gần nhất', truoc) + nut('Bản lưu bền vững', ben);
  document.getElementById('restoreModal').classList.remove('hidden');
}
function closeRestoreModal(){ document.getElementById('restoreModal').classList.add('hidden'); }
function restoreSlot(ten){
  let key = ten==='Cuối ngày gần nhất' ? 'techWorldAutoSave' : ten==='Bản trước lần khôi phục gần nhất' ? 'techWorldBeforeRestore' : 'techWorldStableSave';
  let data = localStorage.getItem(key);
  if(!data){ showGameDialog('Chưa có bản lưu này.', 'Khôi phục'); return; }
  // Lưu bản hiện tại vào dự phòng trước khi thay
  localStorage.setItem('techWorldBeforeRestore', JSON.stringify(gameState));
  gameState = JSON.parse(data);
  closeRestoreModal(); updateUI(); filterProducts(); renderStaffTab(); renderAttendanceTab(); renderUpgrades(); renderBranches();
  showGameDialog('Đã khôi phục: '+ten, 'Khôi phục');
}
function openSaveModal(){
  closeSettingsModal();
  let code = btoa(unescape(encodeURIComponent(JSON.stringify(gameState))));
  document.getElementById('saveCodeText').value = code;
  document.getElementById('saveModal').classList.remove('hidden');
}
function closeSaveModal(){ document.getElementById('saveModal').classList.add('hidden'); }
function copySaveCode(){
  let t = document.getElementById('saveCodeText'); t.select(); document.execCommand('copy');
  showGameDialog('Đã sao chép mã. Dán vào máy khác để khôi phục.', 'Sao lưu');
}
function downloadSaveTxt(){
  let code = document.getElementById('saveCodeText').value;
  let a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([code],{type:'text/plain'})); a.download = 'the-gioi-cong-nghe-save.txt'; a.click();
}
function openRestoreCodeModal(){
  closeSettingsModal();
  document.getElementById('restoreCodeModal').classList.remove('hidden');
}
function closeRestoreCodeModal(){ document.getElementById('restoreCodeModal').classList.add('hidden'); }
function restoreFromCodeText(){
  let code = document.getElementById('restoreCodeText').value.trim();
  if(!code){ showGameDialog('Hãy dán mã vào ô trước.', 'Khôi phục'); return; }
  try{
    localStorage.setItem('techWorldBeforeRestore', JSON.stringify(gameState));
    gameState = JSON.parse(decodeURIComponent(escape(atob(code))));
    closeRestoreCodeModal(); updateUI(); filterProducts(); renderStaffTab(); renderAttendanceTab(); renderUpgrades(); renderBranches();
    showGameDialog('Khôi phục từ mã thành công.', 'Khôi phục');
  }catch(e){ showGameDialog('Mã không hợp lệ.', 'Khôi phục'); }
}
function readRestoreFile(e){
  let f = e.target.files[0]; if(!f) return;
  let r = new FileReader(); r.onload = function(){ document.getElementById('restoreCodeText').value = r.result; }; r.readAsText(f);
}
function toggleOnlineSelling(){
  gameState.isOnline=!gameState.isOnline;
  let btn=document.getElementById('onlineBtn');
  let st=document.getElementById('onlineStatus');
  if(gameState.isOnline){
    btn.innerText='🛒 Bán Online: ĐANG BẬT';
    btn.style.background='#22c55e';
    st.innerText='Đang bán Online - Trời mưa bán càng ngon!';
    logEvent('Đã bật Bán Online! Khách Online sẽ đặt đơn, cần bấm Xác nhận để đóng gói.');
  } else {
    btn.innerText='🛒 Bán Online: ĐANG TẮT';
    btn.style.background='#0ea5e9';
    st.innerText='Chưa bán Online - Bật lên để bán cả khi mưa';
    logEvent('Đã tắt Bán Online.');
  }
  updateUI();
}
function createOnlineOrder(){
  let coHang=gameState.products.filter(x=>x.stock>0);
  if(coHang.length===0) return;
  let p=coHang[Math.floor(Math.random()*coHang.length)];
  let tenNu=['Minh Anh','Thu Hằng','Phương Linh','Khánh Vy','Lan Anh','Thảo Nguyên'];
  let tenNam=['Quốc Bảo','Đức Anh','Hoàng Nam','Gia Huy','Minh Quân','Tuấn Kiệt'];
  let laNu=Math.random()<0.5;
  let ten=(laNu?tenNu:tenNam)[Math.floor(Math.random()*6)];
  let don={id:Date.now(), productId:p.id, productName:p.name, price:Math.round(p.price*gameState.selectedProvince.advX*0.9), customer:ten, status:'cho'};
  gameState.onlineOrders.push(don);
  logEvent('🛒 Online: Khách '+(laNu?'chị ':'anh ')+ten+' đặt 1 '+p.name+' - Bấm Xác nhận để đóng gói!');
  renderOnlineOrders();
}
function renderOnlineOrders(){
  let box=document.getElementById('onlineOrdersList'); if(!box) return;
  box.innerHTML='';
  gameState.onlineOrders.forEach(don=>{
    let d=document.createElement('div');
    d.style.cssText='background:#1e293b;border:1px solid #334155;border-radius:10px;padding:8px;font-size:12px;color:#fff';
    if(don.status==='cho'){
      d.innerHTML='<b>🛒 '+don.customer+' đặt: '+don.productName+'</b><br>Giá: '+formatVND(don.price)+' | Kho còn hàng<br><button onclick="xacNhanDonOnline('+don.id+')" style="margin-top:6px;padding:6px 10px;border-radius:8px;background:#22c55e;color:#fff;font-weight:800;border:none">Xác nhận + Đóng gói</button>';
    } else {
      d.innerHTML='<b>📦 '+don.customer+' - '+don.productName+'</b><br>Đang giao hàng... sẽ nhận tiền + đánh giá sau 1 phút!';
    }
    box.appendChild(d);
  });
}
function xacNhanDonOnline(id){
  let don=gameState.onlineOrders.find(x=>x.id===id); if(!don) return;
  let p=gameState.products.find(x=>x.id===don.productId);
  if(!p || p.stock<=0){ showGameDialog('Hết hàng rồi! Đơn này bị hủy, khách Online bỏ đi.', 'Hết hàng'); gameState.onlineOrders=gameState.onlineOrders.filter(x=>x.id!==id); renderOnlineOrders(); return; }
  p.stock--;
  don.status='dangGiao';
  logEvent('📦 Đã đóng gói 1 '+don.productName+' cho khách '+don.customer+', đang giao hàng...');
  renderOnlineOrders(); filterProducts(); updateUI();
  setTimeout(()=>{ hoanThanhGiaoHang(id); }, 60000);
}
function hoanThanhGiaoHang(id){
  let don=gameState.onlineOrders.find(x=>x.id===id); if(!don) return;
  gameState.cash+=don.price;
  gameState.dailyRevenue+=don.price;
  gameState.onlineRevenue+=don.price;
  gameState.totalRevenue+=don.price;
  gameState.onlineOrders=gameState.onlineOrders.filter(x=>x.id!==id);
  let stars=Math.random()<0.7?5:4;
  addReview(stars,'Giao hàng Online cho '+don.customer);
  logEvent('✅ Đã giao xong cho '+don.customer+' (+'+formatVND(don.price)+') - Khách đánh giá '+stars+' sao!');
  renderOnlineOrders(); updateUI(); filterProducts();
}
window.onload=()=>{
  renderProvincesScrollList(); updateUI();
  let fill=document.getElementById('splashFill');
  let w=0;
  let t=setInterval(()=>{
    w+=10; if(fill) fill.style.width=w+'%';
    if(w>=100){
      clearInterval(t);
      setTimeout(()=>{
        document.getElementById('splashScreen').classList.add('hide');
        setTimeout(()=>{ document.getElementById('splashScreen').style.display='none'; },600);
      },300);
    }
  },120);
};