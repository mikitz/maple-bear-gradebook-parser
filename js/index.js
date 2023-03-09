function setupListeners(){
    const fileUpload = document.getElementById('formFileSm')
    fileUpload.addEventListener('change', function(evt) {
        var files = evt.target.files; // FileList object
        let data = ExcelToJSON(files[0]); // Get the data from the file


        console.log("Data (Raw):", data)
        console.log("Data[0]:", data[0])
        const FUCKYOU = data.find(e => e.NAME == 'Students').DATA
        console.log("Data:", FUCKYOU)
        

        localStorage.setItem('data', data)
    })
}
// Functions to convert Excel to JSON
// Source: https://stackoverflow.com/a/52870648/3725925
function ExcelToJSON(file) {
    let sheetData = []
    var reader = new FileReader();
    reader.onload = function(e) {
        var data = e.target.result;
        var workbook = XLSX.read(data, {
            type: 'binary'
        });
        
        workbook.SheetNames.forEach(function(sheetName) {
            // Here is your object
            var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
            var json_object = JSON.stringify(XL_row_object);
            // console.log(JSON.parse(json_object))
            sheetData.push({
                NAME: sheetName,
                DATA: JSON.parse(json_object)
            })
        })
        
        
    };
    reader.onerror = function(ex) { console.error(ex) };
    reader.readAsBinaryString(file);

    return sheetData
};