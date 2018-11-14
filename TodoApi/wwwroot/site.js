const uri = "api/dots";

$(document).ready(function () {
});


function addItem() {
    const item = {
        x: $("#x").val(),
        y: $("#y").val(),
    };

    $.ajax({
        type: "POST",
        accepts: "application/json",
        url: uri,
        contentType: "application/json",
        data: JSON.stringify(item),
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Something went wrong!");
        },
        success: function (result) {
            $("#x").val("");
            $("#y").val("");
            console.log("added x = " + item.x + "; y = " + item.y + " to the server");
        }
    });
}

function deleteItem(id) {
    $.ajax({
        url: uri + "/" + id,
        type: "DELETE",
        success: function (result) {
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("error");
        }
    });
}

$(".form").on("Add", function () {
    const item = {
        x: $("#x").val(),
        y: $("#y").val(),
        id: $("#edit-id").val()
    };

    $.ajax({
        url: uri + "/" + $("#edit-id").val(),
        type: "PUT",
        accepts: "application/json",
        contentType: "application/json",
        data: JSON.stringify(item),
        success: function (result) {
            getData();
        }
    });

    closeInput();
    return false;
});

function closeInput() {
    $("#spoiler").css({ display: "none" });
}


function sort()
{
    $.ajax({
        type: "GET",
        url: uri,
        cache: false,
        success: function (data) {
            data.sort(function compare(a, b) {
                return a.x - b.x;
            });
            var drawingCanvas = document.getElementById('canvas');
            if (drawingCanvas && drawingCanvas.getContext) {
                var context = drawingCanvas.getContext('2d');
                context.strokeStyle = "#0095ff";
                context.fillStyle = "#ddfaff";
                context.fillRect(0, 0, 800, 600);

                context.strokeStyle = "#000000";
                context.lineWidth = 1;
                context.beginPath();
                context.moveTo(drawingCanvas.clientWidth / 2, 0);
                context.lineTo(drawingCanvas.clientWidth / 2, drawingCanvas.clientHeight);
                context.stroke();
                context.moveTo(0, drawingCanvas.clientHeight / 2);
                context.lineTo(drawingCanvas.clientWidth, drawingCanvas.clientHeight / 2);
                context.stroke();
                context.lineWidth = 2;
                context.closePath();
                context.beginPath();
                for (var i = 1; i < data.length; i++) {
                    context.moveTo(400 + data[i - 1].x, 300 - data[i - 1].y);
                    context.lineTo(400 + data[i].x, 300 - data[i].y);
                    context.stroke();
                }
                context.closePath();

                context.fillStyle = "#0900d2";
                for (var i = 0; i < data.length; i++) {
                    context.beginPath();
                    context.arc(400 + data[i].x, 300 - data[i].y, 5, 0, Math.PI * 2, true);
                    context.closePath();
                    context.fill();
                }
            }
            $("#dots").empty();
            for (var i = 0; i <data.length; i++) {
                deleteItem(data[i].id);
            }
            $.each(data, function (key, item) {
                console.log("Server: x = " + item.x + "; y = " + item.y + "; id = " + item.id);
                //deleteItem(item.id);
            });
        }
    });
}