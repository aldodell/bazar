class BazarPuntoApp extends KApplicationClass {
    server = "bazarServer.php";
    user;
    orders = [];
    orderViewer;
    totalBsS;
    totalDolares;
    navigationManager = KNavigationManager();


    get loginScreen() {
        let screen = KScreen(this.navigationManager);
        let email, cedula;
        screen.title.setValue("Bazar 2024 Punto App");
        screen.add(
            KColumn()
                .addCssText("border: 1px solid black; padding: 10px;")
                .addCssText("width: fit-content; height: fit-content;")
                .center()
                .add(
                    KText().setPlaceholder("email").getMe((me) => email = me),
                    KText().setPlaceholder("cedula").getMe((me) => cedula = me),
                    KButton("Ingresar").addEvent("click", (() => {
                        let payload = {
                            "email": email.getValue().toString().toLowerCase(),
                            "cedula": cedula.getValue()
                        }

                        KMessage("system", "bazarServer", "Bazar Punto App", "system", "login", payload)
                            .remoteSend(this.server, (answer) => {
                                console.log(answer);
                                if (answer != "ERROR_USER_NOT_FOUND") {
                                    this.user = JSON.parse(answer);
                                    this.navigationManager.navigateTo(this.payScreen);
                                } else {
                                    alert("Usuario no encontrado");
                                }
                            }
                            )
                    })
                    )
                )
        );
        return screen;
    }


    get payScreen() {
        let screen = KScreen(this.navigationManager);
        let monto, ordenId;
        screen.title.setValue("Bazar 2024 Cobro App");


        function addDigit(digit) {
            let v = monto.getValue().toString();
            if (v == "0") {
                monto.setValue(digit);
            } else {
                monto.setValue(v + digit);
            }
        }

        let submitOrder = () => {
            let payload = {
                "cedula": this.user.cedula,
                "monto": monto.getValue().replace(",", ".").trim()
            }
            KMessage("system", "bazarServer", "Bazar Cobro App", "system", "submitOrder", payload)
                .remoteSend(this.server, (answer) => {
                    console.log(answer);
                    if (answer != "ERROR") {
                        ordenId.setValue("ID = " + JSON.parse(answer).id);
                        monto.setValue("0");
                    } else {
                        ordenId.setValue("ERROR");

                    }
                }
                )
        }

        screen.add(
            KColumn()
                .addCssText("width: fit-content; height: fit-content;")
                .addCssText("border: 1px solid black; margin: 10px;")
                .center()
                .add(

                    KRow()
                        .addCssText("width: 200px; height: 2em; padding: 10px; margin:auto;")
                        .add(
                            KText()
                                .addCssText("width:100%; text-align: right; font-size:2em;")
                                .setPlaceholder("monto")
                                .getMe((me) => monto = me)
                                .setValue("0"),
                        ),

                    KRow()
                        .addCssText("width: fit-content; height: 64px; margin:auto;")
                        .add(
                            KButton("1").addEvent("click", (() => { addDigit(1) })),
                            KButton("2").addEvent("click", (() => { addDigit(2) })),
                            KButton("3").addEvent("click", (() => { addDigit(3) })),
                        )
                        .addCssTextToChildren("width: 48px; height: 48px; margin: 8px;"),

                    KRow()
                        .addCssText("width: fit-content; height: 64px; margin:auto;")
                        .add(
                            KButton("4").addEvent("click", (() => { addDigit(4) })),
                            KButton("5").addEvent("click", (() => { addDigit(5) })),
                            KButton("6").addEvent("click", (() => { addDigit(6) })),
                        )
                        .addCssTextToChildren("width: 48px; height: 48px;margin: 8px;"),

                    KRow()
                        .addCssText("width: fit-content; height: 64px; margin:auto;")
                        .add(
                            KButton("7").addEvent("click", (() => { addDigit(7) })),
                            KButton("8").addEvent("click", (() => { addDigit(8) })),
                            KButton("9").addEvent("click", (() => { addDigit(9) })),
                        )
                        .addCssTextToChildren("width: 48px; height: 48px;margin: 8px;"),

                    KRow()
                        .addCssText("width: fit-content; height: 64px; margin:auto;")
                        .add(
                            KButton("0").addEvent("click", (() => { addDigit(0) })),
                            KButton(",").addEvent("click", (() => { addDigit(",") })),
                            KButton("X")
                                .addEvent("click", (() => { monto.setValue("0") }))
                                .addCssText("background-color: red; color: white; font-weight: bold;")
                            ,
                        )
                        .addCssTextToChildren("width: 48px; height: 48px;margin: 8px;"),


                    KRow()
                        .addCssText("width: fit-content; height: 64px; margin:auto;")
                        .add(
                            KButton("Enviar")
                                .addCssText("width: 100px; height: 48px; margin: 8px;")
                                .addEvent("click", (() => { submitOrder() })),


                        ),
                    KRow()
                        .addCssText("width: fit-content; height: 64px; margin:auto; font-size: 2em;")
                        .add(
                            KCell().getMe((me) => ordenId = me)
                        ),
                    KRow()
                        .addCssText("width: fit-content; height: 64px; margin:auto;")
                        .add(
                            KButton("Ver órdenes")
                                .addCssText("width: 100px; height: 48px; margin: 8px;")
                                .addEvent("click", (() => { this.navigationManager.navigateTo(this.ordersScreen) })),


                        ),
                    KRow()
                        .addCssText("width: 100%; height: 20px; margin:auto;")
                        .add(
                            KCell().setValue("Usuario: " + this.user.apellidos + " " + this.user.nombres)
                        ),




                )

        );
        return screen;



    }



    get ordersScreen() {
        let screen = KScreen(this.navigationManager);
        screen.title.setValue("Bazar 2024 Punto App");

        let upddateOrders = () => {
            let payload = {
                "cedula": this.user.cedula,
            }
            KMessage("system", "bazarServer", "Bazar Punto App", "system", "getOrders", payload)
                .remoteSend(this.server, (answer) => {
                    if (answer != "ERROR") {
                        let arrayData = JSON.parse(answer);
                        this.orderViewer.setArrayData(arrayData, false);
                        let bs = 0;
                        let usd = 0;
                        for (let row of arrayData) {
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
            KColumn()
                .addCssText("dislay: block; position: absolute; width: fit-content; height:fit-content; left: 50%; top: 50%; transform: translate(-50%, -50%);")
                .addCssText("border: 1px solid black; padding: 2px;")
                .add(
                    KRow()
                        .addCssText("width:fit-content; fit-content;")
                        .add(
                            KDataTableView2()
                                .addCssText("width:240px; height:240px; overflow-y: hidden;")
                                .getMe((me) => this.orderViewer = me)
                                .addColumn((rowData) => KCell(), "id", "ID", "40px")
                                .addColumn((rowData) => KCell(), "monto", "Ref", "40px")
                                .addColumn((rowData) => KCheckbox(), "cancelado", "Canc.", "40px")
                                .addColumn((rowData) => KCell(), "bolivares", "BsS.", "40px")
                                .addColumn((rowData) => KCell(), "dolares", "$", "40px"),
                        ),

                    KRow()
                        .addCssText("width:fit-content; height: fit-content; left: 50%; transform: translate(-50%, 0%);padding:8px;")
                        .add(
                            KButton("Actualizar")
                                .setSize("100px", "50px")
                                .addEvent("click", (() => {
                                    upddateOrders();
                                }))
                        ),

                    KRow()
                        .addCssText("width:fit-content; height: fit-content; left: 50%; transform: translate(-50%, 0%);")
                        .addCssText("border: 1px solid black; padding: 10px;")
                        .add(
                            KCell()
                                .addCssText("width:200px; height: 20px; text-align: right;")
                                .getMe((me) => this.totalBsS = me)
                                .setValue("BsS. 0"),
                        ),

                    KRow()
                        .addCssText("width:fit-content; height: fit-content; left: 50%; transform: translate(-50%, 0%);")
                        .addCssText("border: 1px solid black; padding: 10px;")
                        .add(
                            KCell()
                                .addCssText("width:200px; height: 20px;text-align: right;")
                                .getMe((me) => this.totalDolares = me)
                                .setValue("$. 0"),
                        ),
                )

        )
        upddateOrders();


        return screen;
    }


    constructor() {
        super("bazarPunto", "Bazar punto", ["system"]);
        this.rootView = this.navigationManager.push(this.loginScreen);
    }
}


var bazarPuntoApp = new BazarPuntoApp();
bazarPuntoApp.register();
