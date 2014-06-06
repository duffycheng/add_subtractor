(function(){
    function Caculation(root){
        var root = $(root), node = {};
        //grape all the DOM we need
        this.node=node;
        node.root = root;
        node.input_x = root.find("#number_x");
        node.input_y = root.find("#number_y");
        node.triggers = root.find(".actions a");
        node.deleteTriggers = root.find(".delete-actions a");
        node.message = root.find(".message");

        //store the calculation variables
        this.caculateObj={x:0,y:0,z:0,action:"add"};

        //start working!
        this.observe();

    }

    Caculation.prototype={
        observe:function(){
            var node = this.node;
            node.triggers.on("click", this.cacluate.bind(this));
            node.deleteTriggers.on("click", this.deleteFunc.bind(this));
        },
        cacluate:function(e){
            e.preventDefault();
            
            //get the value from the input field and pass the clicked button for the data on it
            this.getValue($(e.currentTarget));
            
            //validation
            var isValidateX =  this.validate(this.caculateObj.x, this.node.input_x),
                isValidateY = this.validate(this.caculateObj.y, this.node.input_y);
            //only validated data go to calculation step
            if(isValidateX && isValidateY){
                this.caculate();
                this.showMessage();
            }
        },
        getValue: function(actionDOM){
        	//populate variables in the object
            var node = this.node;
            this.caculateObj.x = node.input_x.val();
            this.caculateObj.y = node.input_y.val();
            this.caculateObj.action = actionDOM.attr("class");
            this.caculateObj.symbol = actionDOM.data("symbol");
        },
        add:function(x,y){
            return x+y;
        },
        subtract:function(x,y){
            return x-y;
        },
        multiple:function(x,y){
            return x*y;
        },
        divide:function(x,y){
            return x/y;
        },
        validate:function(num,input){
        	//not validate, show warning message
            if(num === null || num === ""){
                input.siblings(".warning").text("Please Enter a Number");
                return false;
            }

            var number = parseInt(num, 10);

            if(isNaN(number)){
                input.siblings(".warning").text("Are you sure this is a NUMBER?");
                return false;
            }else{
                input.siblings(".warning").text("");
                return true;
            }
        },
        caculate:function(){
            var node = this.node, calObj = this.caculateObj;
            //call the right function to do the work
            switch(calObj.action){
                case "add":
                calObj.z = this.add(calObj.x,calObj.y);
                break;
                case "subtract":
                calObj.z = this.subtract(calObj.x,calObj.y);
                break;
                case "multiple":
                calObj.z = this.multiple(calObj.x,calObj.y);
                break;
                case "divide":
                calObj.z = this.divide(calObj.x,calObj.y);
                break;
                
            }
        },
        showMessage:function(){
            var node = this.node,message = "",calObj = this.caculateObj;
            message = calObj.x +" "+calObj.symbol+" "+calObj.y+" = "+calObj.z;
            node.message.text(message);
        },
        deleteFunc:function(e){
        	//clean the input field
            e.preventDefault();
            var node = this.node,label = $(e.currentTarget).data("label");
            node.root.find("#number_"+label).val("");
        }

     };

     new Caculation(".caculator");

})();