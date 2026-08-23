const fs = require('fs');
const readline = require('readline');
const path = require('path');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function a(b) {
    let c = b.split('').reverse().join('');
    let d = [];
    for(let e = 0; e < c.length; e++) {
        let f = c.charCodeAt(e);
        f = f + (e * 7);
        f = f ^ (e * 13);
        f = f & 0xFFFF;
        d.push(f.toString(16));
    }
    let g = d.join('|');
    let h = [];
    for(let e = 0; e < g.length; e++) {
        let i = g.charCodeAt(e) + (e % 5) + 10;
        h.push(i.toString(36));
    }    
    return h.join(':');
}
function b() {
    return `
function c(d) {
    let e = d.split(':');
    let f = '';
    for(let g = 0; g < e.length; g++) {
        let h = parseInt(e[g], 36);
        f += String.fromCharCode(h - (g % 5) - 10);
    }    
    let i = f.split('|');
    let j = '';
    for(let g = 0; g < i.length; g++) {
        let k = parseInt(i[g], 16);
        k = k ^ (g * 13);
        k = k - (g * 7);
        j += String.fromCharCode(k);
    }
    return j.split('').reverse().join('');
}
`;
}
console.log('\n╔═══════════════════════════╗');
console.log('║   JAVASCRIPT ENCRYPTOR    ║');
console.log('╚═══════════════════════════╝\n');
console.log('Developer : Thxyzz404');
console.log('');
console.log('Contoh pengguna : /sdcard/Folder/File.js');
console.log('');
rl.question('📁 Masukkan file path JS : ', (inputFile) => {    
    if (!fs.existsSync(inputFile)) {
        console.log('\n❌ File tidak ditemukan!');
        rl.close();
        return;
    }    
    try {
        const folderName = '/sdcard/ENCRIPSI_JAVASCRIT';
        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName);
        }       
        const originalCode = fs.readFileSync(inputFile, 'utf8');
        const encodedData = a(originalCode);
        const fileName = path.basename(inputFile);
        const outputFile = path.join(folderName, fileName.replace('.js', '_enc.js'));        
        console.log('\n⚡ Mengenkripsi dengan 4 layer encoding.');       
        const finalCode = `
${b()}
const d = "${encodedData}";
const e = c(d);
eval(e);
`;      
        fs.writeFileSync(outputFile, finalCode);       
        console.log(`\n✅ SUKSES! File terenkripsi.`);
        console.log(`📁 ${outputFile}`);
        console.log(``);       
    } catch(err) {
        console.log('\n❌ Error:', err.message);
    }    
    rl.close();
});