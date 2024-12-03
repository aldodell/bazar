class BazarControlApp extends KApplicationClass {
    server = "bazarServer.php";
    usersDataList = KDataList();
    orders;
    filter;

    get controlScreen() {
        let screen = KScreen(this.navigationManager);
        screen.title.setValue("Bazar 2024 Control App");

        let payOrder = (row) => {
            if (window.confirm("¿Desea marcar como pagada la orden " + row.getData().id + "?")) {

                let payload = row.getData();

                if (payload.dolares == 0 && payload.bolivares == 0) {
                    if (confirm("Debe ingresar monto en bolívares o dólares. Si responde sí quedará en dólares. Caso contrario en bolívares.")) {
                        row.dom.childNodes[4].value = payload.monto;
                    } else {
                        row.dom.childNodes[3].value = payload.monto;

                    }
                    row.dom.childNodes[2].checked = false;

                    return;
                }

                KMessage("system", "bazarServer", "Bazar Control App", "system", "markOrderAsPaid", payload)
                    .remoteSend(this.server, (answer) => {
                        if (answer == "OK") {
                            getAllOrders();
                        }
                    })
            }
        }
        let getAllOrders = () => {
            KMessage("system", "bazarServer", "Bazar Control App", "system", "getAllOrders", {})
                .remoteSend(this.server, (answer) => {
                    if (answer != "ERROR") {
                        this.orders = JSON.parse(answer);
                        this.orderViewer.setArrayData(this.orders, true);
                        let bs = 0;
                        let usd = 0;
                        for (let row of this.orders) {
                            if (row.cancelado == 1) {
                                bs += row.bolivares;
                                usd += row.dolares;
                            }
                        }
                        this.totalBsS.setValue("BsS. " + bs);
                        this.totalDolares.setValue("$ " + usd);
                    }
                })
        }

        screen.add(
            this.usersDataList,

            KColumn()
                .addCssText("width: fit-content; height: fit-content;")
                .center()
                .add(
                    KRow()
                        .add(
                            KText()
                                .addCssText("width: 220px; height: 20px; margin: 10px; text-align: right;")
                                .setDataList(this.usersDataList)
                                .getMe((me) => this.filter = me)
                                .addEvent("input", () => {
                                    let cedulaEmprendedor = this.filter.getValue();
                                    if (cedulaEmprendedor != undefined) {
                                        let filtered = this.orders.filter((row) => row.cedulaEmprendedor == cedulaEmprendedor);
                                        this.orderViewer.setArrayData(filtered, true);
                                        let bs = 0;
                                        let usd = 0;
                                        for (let row of filtered) {
                                            if (row.cancelado == 1) {
                                                bs += row.bolivares;
                                                usd += row.dolares;
                                            }
                                        }
                                        this.totalBsS.setValue("BsS. " + bs);
                                        this.totalDolares.setValue("$ " + usd);
                                    }
                                })

                            ,
                        ),
                    KRow()
                        .addCssText("width: fit-content; height: fit-content;")
                        .add(
                            KDataTableView2()
                                .addCssText("width:240px; height:240px; overflow-y: hidden;")
                                .getMe((me) => this.orderViewer = me)
                                .addColumn((row, rowData) => KCell(), "id", "ID", "40px")
                                .addColumn((row, rowData) => KCell(), "monto", "Ref", "40px")
                                .addColumn((row, rowData) => KCheckbox().addEvent("click", (() => payOrder(row))), "cancelado", "Canc.", "40px")
                                .addColumn((row, rowData) => KText().setInputMode("decimal"), "bolivares", "BsS.", "40px")
                                .addColumn((row, rowData) => KText().setInputMode("decimal").setValue(rowData.dolares), "dolares", "$", "40px"),
                        ),
                    KRow()
                        .add(
                            KButton("Actualizar")
                                .addCssText("width: 220px; height: 64px; margin: 10px;")
                                .addEvent("click", (() => {
                                    getAllOrders();
                                }))
                        ),
                    KRow()
                        .add(
                            KCell()
                                .addCssText("width: 220px; height: 20px; margin: 10px; text-align: right;")
                                .setValue("BsS. 0")
                                .getMe((me) => this.totalBsS = me),
                        ),

                    KRow()
                        .add(
                            KCell()
                                .addCssText("width: 220px; height: 20px; margin: 10px; text-align: right;")
                                .setValue("$. 0")
                                .getMe((me) => this.totalDolares = me),
                        ),



                ));

        getAllOrders();
        return screen;
    }



    constructor(navigationManager) {
        super("bazarControl", "Bazar Control", ["system-adm"]);
        this.navigationManager = navigationManager;
        this.rootView = this.navigationManager.push(this.controlScreen);
        let payload = {
            "cedula": "*"
        }
        //Get users:
        KMessage("system", "bazarServer", "Bazar Control App", "system", "getAllUsers", payload)
            .remoteSend(this.server, (answer) => {
                if (answer != "ERROR") {
                    let data = JSON.parse(answer);
                    this.usersDataList.setArrayData(data);
                }
            })
    }
}


var bazarControl = new BazarControlApp(navigationManager);
bazarControl.register();