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
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function(totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) *100);
        } else {
            this.percentage = -1;
        }
    };

    Expense.prototype.getPercentage = function(){
        return this.percentage;
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
        addItem: function(type, description, value){
            var newItem, ID;

            //La ID será la ID del último elemento del array +1.
            ID = data.allItems[type].length > 0 ? data.allItems[type][data.allItems[type].length - 1].id +1 : 0;

            switch (type) {
                case "inc":
                    newItem = new Income (ID, description, value);
                    break;
                case "exp":
                    newItem = new Expense (ID, description, value);
                    break;
                default:
                    break;
            }

            // Lo "empujamos sobre" (metemos en) nuestra estructura de datos.
            data.allItems[type].push(newItem);

            // Devolvemos el Item para que se quede encapsulado y sea accesible para el UI controller.
            return newItem;
        },

        calculateBudget: function(){
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

        calculatePercentages: function(){
            //Calculamos el porcentage en cada uno de los elementos que tenemos en "Exp"
            data.allItems.exp.forEach(function(current){
                current.calcPercentage(data.totals.inc);
            });
        },

        getPercentages: function(){
            var allperc = data.allItems.exp.map(function(current){
                return current.getPercentage();
            });

            return allperc;
        },

        deleteItem: function(type, ID){
            var ids, index;

            //Creamos un nuevo array con las ids de los exp o inc que tenemos almacenados en "allItems".
            ids = data.allItems[type].map(function(current){
                return current.id;
            });

            index = ids.indexOf(ID);
            //Si el index no existe nos devolverá un -1
            if (index !== -1) {
                //"Rebanamos" el elemento que está entre la posición "index" el siguiente a Index.
                data.allItems[type].splice(index, 1);
            }

            //DUDA: Si al mapear el array podemos acceder a su valor actual y a su index, ¿por qué no obtenemos directamente el index del valor de Id que nos interesa. Algo como:
            /* ids = data.allItems[type]map(function (current, index){
                if (current.id === ID){
                    return index
                }
            });
            */
        },

        testing: function(){console.log(data);}
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
        percentageLabel: "budget_expenses-percentage",
        activity: "activity",
        expensesPercLabel: "item_percentage"
    };

    var formatNumber = function (num, type) {
        var numSplit, int, dec;

        /* FORMAT:
        * 1. + or - before number
        * 2. exactly 2 decimal points
        * 3. comma separating the thousands
        */

        //Convertimos el número en un dígito absoluto.
        num = Math.abs(num);
        //Lo fijamos a dos decimales.
        num = num.toFixed(2);

        //Lo dividimos en dos partes, una antes del punto decimal y la otra después.
        numSplit = num.split(".");
        //Lo que va antes del punto decimal lo guardamos en la variable int
        int = numSplit[0];
        //Lo que va después del punto decimal lo guardamos en la variable dec
        dec = numSplit[1];

        //Ahora colocamos la coma que separa los miles.
        if (int.length > 3){
            //Si el entero (int) es superior a tres dígitos:
            //El entero pasa a estar formado por:
            //1: Los dígitos almacenados en el string int, desde la posición 0 hasta la posición que sea el largo del string menos 3 digitos.
            //2: la coma de los miles.
            //3: Los dígitos almacenados en el string, empezando desde la posición del largo menos 3 hasta el final del string (Que, evidentemente sólo puede ser 3 más allá).
            int = int.substr(0, int.length - 3) + "," + int.substr(int.length - 3, 3);
        }

        return (type === "exp" ? "- " : "+ ") + int + "." + dec;
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
                    html = '<div class="item" id="inc-%id%"><div id="item_description">%description%</div><div><div id="item_value">%value%</div><div id="item_delete"><button id="item_delete-btn"><i class="fas fa-times"></i></button></div></div></div>';
                    break;

                case "exp":
                    printTarget = DOMids.expensesContainer;
                    html = '<div class="item" id="exp-%id%"><div id="item_description">%description%</div><div><div id="item_value">%value%</div><div id="item_percentage">20%</div><div id="item_delete"><button id="item_delete-btn"><i class="fas fa-times"></i></button></div></div></div>';
                    break;
            }

            // Reemplazar el texto emplazado con datos reales.
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

            // Inserta el HTML en el DOM
            $(printTarget).insertAdjacentHTML('beforeend', newHtml);
        },

        clearFields: function(){
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

        displayBudget: function(obj){
            var type;
            type = obj.budget > 0 ? "inc" : "exp";

            $(DOMids.budgetLabel).textContent = formatNumber(obj.budget, type) ;
            $(DOMids.incomeLabel).textContent = formatNumber(obj.totalInc, "inc");
            $(DOMids.expenseLabel).textContent = formatNumber(obj.totalExp, "exp");

            if (obj.percentage > 0) {
                $(DOMids.percentageLabel).textContent = obj.percentage + "%";
            } else {
                $(DOMids.percentageLabel).textContent = "--";
            }
        },

        displayPercentages: function(percentages){
            var fields = document.querySelectorAll("#" + DOMids.expensesPercLabel);

            var nodeListForEach = function(list, callback){
                for (let i = 0; i < list.length; i++) {
                    callback(list[i], i);
                }
            };

            nodeListForEach(fields, function(current, index){
                if (percentages[index] > 0) {
                    current.textContent = percentages[index] + "%";
                } else {
                    current.textContent = "--";
                }
            });
        },

        //Eliminar un elemento de la lista de elementos de la UI.
        deleteListItem: function(selectorID){
            //Como sólo se puede eliminar un descendiente de un elemento, vamos a asceder al padre del elemento y luego eliminar al elemento llamándolo como su descendiente.
            $(selectorID).parentNode.removeChild($(selectorID));
        },

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

        //EVENTO DELEGADO -->
        $(DOM.activity).addEventListener("click", ctrlDeleteItem);
        console.log(DOM.activity);
    }

    //Función para eliminar elementos
    var ctrlDeleteItem = function(event) {
        var itemID, splitID, type, ID;
        itemID = (event.target.parentNode.parentNode.parentNode.id);

        if (itemID) {
            // 1. Diseccionamos el ID obtenido.
            splitID = itemID.split("-");
            type = splitID[0];
            ID = parseInt(splitID[1]);

            // 2. Eliminamos el item de la estructura de datos.
            if (type === "exp" || type === "inc") {
                budgetCtrl.deleteItem(type, ID);

                // 3. Eliminamos el item de la interfaz de usuario.
                UICtrl.deleteListItem(itemID);

                // 4. Actualizamos y mostramos el nuevo presupuesto.
                updateBudget();
    
                // 5. Actualizamos y mostramos el nuevo porcentaje.
                updatePercentages();
            }
        }
    };

    //Función desencadenada al presionar ENTER o darle al botón DONE.
    function addItem() {
        var input, newItem;

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

        //* * 5. Mostrar el presupuesto en la UI
        updateBudget();

        //* * 6. Calculamos y actualizamos los porcentajes.
        updatePercentages();
    }

    function updateBudget(){
        var budget;

        //* * 1. Calcular el presupuesto.
        budget = budgetCtrl.calculateBudget();

        //* * 2. Mostrar el presupuesto en la UI
        UICtrl.displayBudget(budget);
    }

    function updatePercentages(){
        // 1. Calculamos el porcentaje.
        budgetCtrl.calculatePercentages();

        //2. Leemos los porcentajes del budget controller
        var percentages = budgetCtrl.getPercentages();

        //3.  Actualizamos la UI con el nuevo porcentaje.
        UICtrl.displayPercentages(percentages);
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