/////////////////////////Export to  Excel  from Grid

function ExportIFRows(e, title, text) {
  var GridID = "#" + e.sender.element[0].id;
  //alert(GridID);
  var length = $(GridID).data("kendoGrid").dataSource.data().length;
  //alert(e.data.length);

  if (length === 0) {
    // if (length == 0) {
    e.preventDefault();
    Swal.fire({
      icon: "warning",
      title: title,
      text: text,
    });
  }
}
//////////////////////////////
function reloadControl(targetGrid, gridType, loadwithId, LoadingId) {
  var grid = $(targetGrid).data(gridType);
  if (loadwithId) {
    grid.dataSource.read({ id: LoadingId });
  } else {
    grid.dataSource.read();
  }
  grid.refresh();
}

function reloadGrid(targetGrid) {
  return reloadGrid(targetGrid, "kendoGrid");
}

function DeleteRecord(
  gridId,
  gridType,
  recordId,
  deleteUrl,
  SuccessMSg,
  FailedMsg,
  ConfirmDeleteMSg,
  DeleteWarningMSg,
  Yes,
  Close,
  Error,
  RelatedToAnotherMsg,
  ControlRoleDenpendOtherCRsMsgDel,
  ControlRoleDenpendOnMembersMsgDel,
  loadwithId,
  LoadingId
) {
  Swal.fire({
    title: ConfirmDeleteMSg,
    text: DeleteWarningMSg,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: Yes,
    cancelButtonText: Close,
  }).then((result) => {
    if (result.value) {
      $.ajax({
        url: deleteUrl,
        data: { id: recordId },
        async: false,
        type: "POST",
        success: function (data) {
          if (data.Success == false) {
            if (data.Message == undefined || data.Message == "") {
              Swal.fire({
                icon: "error",
                title: Error,
                text: FailedMsg,
                confirmButtonText: Yes,
              });
            } else {
              Swal.fire({
                icon: "error",
                title: data.Message,
                confirmButtonText: Yes,
              });
            }
          } else if (data.Data != undefined && data.Data != "Success") {
            if (data.Data === 0) {
              Swal.fire({
                icon: "error",
                title: RelatedToAnotherMsg,
                confirmButtonText: Yes,
              });
              if (loadwithId) {
                reloadControl("#" + gridId, gridType, loadwithId, LoadingId);
              } else {
                reloadControl("#" + gridId, gridType, false, 0);
              }
            }
          } else if (data === 0) {
            Swal.fire({
              icon: "error",
              title: RelatedToAnotherMsg,
              confirmButtonText: Yes,
            });
            if (loadwithId) {
              reloadControl("#" + gridId, gridType, loadwithId, LoadingId);
            } else {
              reloadControl("#" + gridId, gridType, false, 0);
            }
          } else if (data === "ControlRolesDependOnThisControlRoleDelete") {
            Swal.fire({
              icon: "error",
              title: Error,
              text: ControlRoleDenpendOtherCRsMsgDel,
              confirmButtonText: Yes,
            });
          } else if (data === "MemberDependOnThisControlRoleDelete") {
            Swal.fire({
              icon: "error",
              title: Error,
              text: ControlRoleDenpendOnMembersMsgDel,
              confirmButtonText: Yes,
            });
          } else if (data) {
            Swal.fire({
              icon: "success",
              title: SuccessMSg,
              confirmButtonText: Yes,
            });
            if (loadwithId) {
              reloadControl("#" + gridId, gridType, loadwithId, LoadingId);
            } else {
              reloadControl("#" + gridId, gridType, false, 0);
            }
          } else {
            Swal.fire({
              icon: "error",
              title: Error,
              text: FailedMsg,
              confirmButtonText: Yes,
            });
          }
        },
        error: function (errorThrown) {
          Swal.fire({
            icon: "error",
            title: Error,
            text: FailedMsg,
            confirmButtonText: Yes,
          });
        },
      });
    }
  });
}
function DeleteGridRecord(
  gridId,
  recordId,
  deleteUrl,
  SuccessMSg,
  FailedMsg,
  ConfirmDeleteMSg,
  DeleteWarningMSg,
  Yes,
  Close,
  Error,
  RelatedToAnotherMsg,
  ControlRoleDenpendOtherCRsMsg,
  ControlRoleDenpendOnMembersMsg,
  loadwithId,
  LoadingId
) {
  return DeleteRecord(
    gridId,
    "kendoGrid",
    recordId,
    deleteUrl,
    SuccessMSg,
    FailedMsg,
    ConfirmDeleteMSg,
    DeleteWarningMSg,
    Yes,
    Close,
    Error,
    RelatedToAnotherMsg,
    ControlRoleDenpendOtherCRsMsg,
    ControlRoleDenpendOnMembersMsg,
    loadwithId,
    LoadingId
  );
}
function persistGridState(e) {
  //    var grid = $("#Grid").data("kendoGrid");
  //    localStorage["kendo-grid-options"] = kendo.stringify(grid.getOptions());
  //debugger
  //var options = localStorage["kendo-grid-options"];
  //if (options) {
  //    grid.setOptions(JSON.parse(options));
  // }
}
function IntegerFilter(args) {
  args.element.kendoNumericTextBox({
    format: "#",
    decimals: 0,
    spinners: true,
    min: 0,
  });
}

/*
//============================================Grid Functions ==============================================
// Created by : Ahmed El-Tohamy
// Date : 11-8-2022
//=========================================================================================================
*/
function GridResizeColumnWithIndex(gridId, field, width) {
  var header = $("#" + gridId + " .k-grid-header-wrap");
  var content = $("#" + gridId + " .k-grid-content");

  var index = field;

  header.find("colgroup col").eq(index).css({ width: width });

  content.find("colgroup col").eq(index).css({ width: width });
}

function GridAutoFitColumns(gridId, fromIndex = 0) {
  var grid = $("#" + gridId).data("kendoGrid");

  for (var i = fromIndex; i < grid.columns.length; i++) grid.autoFitColumn(i);
}

function GridRefresh(gridId) {
  $("#" + gridId)
    .data("kendoGrid")
    .dataSource.read();
  $("#" + gridId)
    .data("kendoGrid")
    .refresh();
}

function GridGetListFromColumnName(gridId, fieldName) {
  var result = [];
  var grid = $("#" + gridId).data("kendoGrid");
  var dataSource = grid.dataSource;

  $.each(dataSource.data(), function (index, item) {
    result.push(item[fieldName]);
  });

  return result;
}

function GridGetRow(gridId, index) {
  var grid = $("#" + gridId).data("kendoGrid");
  var dataSource = grid.dataSource;

  return dataSource.data()[index];
}
