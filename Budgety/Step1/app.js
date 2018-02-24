function $(id) {
    return document.getElementById(id);
}
/*
* Módulo para controlarlo todo.
*
//Encapsulamos una función anónima en una variable. De esa forma creamos un módulo.
* ¿Cómo funciona?
* Primero se ejecuta la función anónima y, al hacerlo, esta devuelve un objeto. Dicho objeto contiene los métodos públicos que pueden interactuar con el exterior, y también con el módulo al que pertenece.
*/

// Controlador para el presupuesto
var budgetController = (function () {

    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };

    var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach(function(current){
            valor = Number(current.value);
            sum += valor;
        });

        data.totals[type] = sum;
    };

    //API
    return {
        addItem: function(type, description, value) {
            var newItem, ID;

            //La ID será la ID del último elemento del array +1.
            ID = data.allItems[type].length > 0 ? data.allItems[type][data.allItems[type].length - 1].id +1 : 0;

            switch (type) {
                case "inc":
                    newItem = new Expense (ID, description, value);
                    break;
                case "exp":
                    newItem = new Income (ID, description, value);
                    break;
                default:
                    break;
            }

            // Lo "empujamos sobre" (metemos en) nuestra estructura de datos.
            data.allItems[type].push(newItem);

            // Devolvemos el Item para que se quede encapsulado y sea accesible para el UI controller.
            return newItem;
        },

        calculateBudget: function() {
            //Calcular los ingresos y gastos totales.
            calculateTotal("exp");
            calculateTotal("inc");

            //Calcular el presupuesto: ingresos - gastos.
            data.budget = data.totals.inc - data.totals.exp;

            //Calcular el porcentaje de ingresos que hemos gastado.
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) *100);
            } else {
                data.percentage = -1;
            }

            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };

        },

        testing: function() {console.log(data);}
    };
})();

// Controlador para la interfaz
var UIController = (function () {

    var DOMids = {
        inputType: "add_type",
        inputDescription: "add_description",
        inputValue: "add_value",
        btnAdd: "add_btn", //Botón para adicionar
        //btnDed:, //Botón para deducir
        incomesContainer: "income_list",
        expensesContainer: "expense_list",
        budgetLabel: "budget_value",
        incomeLabel: "budget_income-value",
        expenseLabel: "budget_expenses-value",
        percentageLabel: "budget_expenses-percentage"
    };

    //API
    return {
        //Permite el acceso a los valores ingresados desde la interfaz
        getInput: function () {
            return {
                type: $(DOMids.inputType).value, // string "inc" (income) o "exp" (expense)
                description: $(DOMids.inputDescription).value, //string
                value: $(DOMids.inputValue).value //number
            };
        },

        //Permite el acceso a los nombres de los campos de la interfaz.
        getDOMids: function () {
            return DOMids;
        },

        //Muestra la lista de items
        addListItem: function(obj, type){
            var html, newHtml, printTarget;

            // Crear una cadena HTML con texto emplazado.
            switch (type) {
                case "inc":
                    printTarget = DOMids.incomesContainer;
                    html = '<div class="item" id="income-%id%"><div id="item_description">%description%</div><div><div id="item_value">%value%</div><div id="item_delete"><button id="item_delete-btn"><i class="fas fa-times"></i></button></div></div></div>';
                    break;

                case "exp":
                    printTarget = DOMids.expensesContainer;
                    html = '<div class="item" id="income-%id%"><div id="item_description">%description%</div><div><div id="item_value">%value%</div><div id="item_percentage">20%</div><div id="item_delete"><button id="item_delete-btn"><i class="fas fa-times"></i></button></div></div></div>';
                    break;
            }

            // Reemplazar el texto emplazado con datos reales.
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // INserta el HTML en el DOM
            $(printTarget).insertAdjacentHTML('beforeend', newHtml);
        },

        clearFields: function() {
            //Limpiar los campos a rellenar una vez se ha introducido un nuevo elemento.
            var fields, fieldArr;

            //Seleccionamos los campos y los traemos como una lista de nodos:
            fields = document.querySelectorAll("#" + DOMids.inputDescription + ", #" + DOMids.inputValue);

            //Los convertimos en un array llamando el método slice desde la variable fields.
            fieldArr = Array.prototype.slice.call(fields);

            //Iteramos en cada elemento del array para vaciar el campo.
            fieldArr.forEach(function(current, index, array) {
                current.value = "";
            });

            //Regresamos el foco al primer campo.
            fieldArr[0].focus();

        },

        displayBudget: function(obj) {
            $(DOMids.budgetLabel).textContent = obj.budget;
            $(DOMids.incomeLabel).textContent = obj.totalInc;
            $(DOMids.expenseLabel).textContent = obj.totalExp;

            if (obj.percentage > 0) {
                $(DOMids.percentageLabel).textContent = obj.percentage + "%";
            } else {
                $(DOMids.percentageLabel).textContent = "--";
            }
        }
    };

})();

// GLOBAL APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {

    //Configuramos las escuchas de eventos.
    function setupEventListeners() {
        var DOM = UICtrl.getDOMids();

        //EVENTO --> Al pulsar el botón de añadir.
        $(DOM.btnAdd).addEventListener("click", addItem);

        //EVENTO --> Al pulsar el enter.
        document.addEventListener("keypress", function (event) {

            if (event.key === "Enter") {
                console.log("Cifra aceptada.");
                addItem();
            }
        });
    }

    //Función desencadenada al presionar ENTER o darle al botón DONE.
    function addItem() {
        var input, newItem, budget;

        /* TODO:*/
        //* * 1. Coger los datos que se han rellenado.
        input = UICtrl.getInput(); //Obtiene un objeto con 3 propiedades: Type, description y value.

        //* * 2. Incluir el elemento en el controlador de presupuesto (budgetController)
        //* * * Al mismo tiempo que lo incluimos, se nos devuelve el item, por lo que lo guardamos en una variable.
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        //* * 3. Hacer visible la información ingresada en la UI
        UICtrl.addListItem(newItem, input.type);

        //* * 4. Limpiar los campos introducidos y regresar el foco al primer campo.
        UICtrl.clearFields();

        //* * 5. Calcular el presupuesto.
        budget = budgetCtrl.calculateBudget();

        //* * 6. Mostrar el presupuesto en la UI
        UICtrl.displayBudget(budget);

        console.log("Item añadido" + input);
        console.log(input);
    }

    return {
        init: function(){
            console.log("¡La aplicación se ha iniciado!");
            UICtrl.displayBudget(
                {
                    budget:0,
                    totalInc: 0,
                    totalExp: 0,
                    percentage: -1
                }
            );
            setupEventListeners();
        }
    };

})(budgetController, UIController);

// Iniciamos la app.
controller.init();