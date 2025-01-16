$(document).ready(()=>{
    var btn_create_bank = $('#btn-create-bank')

    btn_create_bank.click(e=>{
        e.preventDefault();
        const data = collectFormData("form-create-bank")
        console.log(data)

    });
});