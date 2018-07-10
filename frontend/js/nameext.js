$(document).ready(()=>{
    
    $("#btn").on('click',(e)=>{
            e.preventDefault();
            window.location.href = "/sheet/upload"
    });
    //     var formData = $('form').get(0);
    //    // var formData = new FormData();
    //     //formData.append('file', $('input[type=file]')[0].files[0]);

    //     //formData.append('file', $('input[type=file]')[0].files[0]);
    //     console.log(formData)
    //     $.post('/seller/upload/files/' + $("#hagga").val(),formData,(data)=>{
    //         alert(data);
    //     });
    // });


});
