var dataStructure = (function() {
  var structure = function(id, InputSub, Time) {
    this.id = id;
    this.InputSub = InputSub;
    this.Time = Time;
  };

  var data = {
    list: []
  };
  return {
    AddOn: function(InputSub, Time) {
      var Id, item;
      if (data.list.length > 0) {
        Id = data.list[data.list.length - 1].id + 1;
      } else {
        Id = 0;
      }
      item = new structure(Id, InputSub, Time);
      console.log(item);
      data.list.push(item);
      localStorage.setItem("data", JSON.stringify(data));
      localStorage.setItem(`${Id}`, `${InputSub}`);
      return item;
    },

    testing: function() {
      console.log(data.list);
    }
  };
})();

var UiController = (function() {
  var DomStrings = {
    InputSub: ".value",
    Time: ".time",
    submit: ".submit",
    container: ".list_items"
  };
  return {
    GetData: function() {
      return {
        work: document.querySelector(DomStrings.InputSub).value,
        Timing: document.querySelector(DomStrings.Time).value
      };
    },
    AddList: function(obj) {
      var html, newHtml;
      var data = localStorage.getItem(`${obj.id}`);
      console.log(data);
      html =
        '<div class="list" id="%id%"><div>%value%</div><div>%time%</div><button class="delete" id="del">delete button</button></div>';
      newHtml = html.replace("%id%", obj.id);
      newHtml = newHtml.replace("%value%", data);
      newHtml = newHtml.replace("%time%", obj.Time);
      document
        .querySelector(DomStrings.container)
        .insertAdjacentHTML("beforeend", newHtml);
    },
    delList: function(id) {
      var el = document.getElementById(id);
      el.parentNode.removeChild(el);
    },
    clearValue: function() {
      var list = document.querySelectorAll(
        DomStrings.InputSub + "," + DomStrings.Time
      );
      var arr = Array.prototype.slice.call(list);
      arr.forEach(function(cur) {
        cur.value = "";
      });
    },
    DomStrings: DomStrings
  };
})();

var Controller = (function(UiCtrl, dataStr) {
  function Selectors() {
    var Months = [
      "january",
      "febuary",
      "March",
      "april",
      "May",
      "june",
      "July",
      "Augest",
      "Sept.",
      "October",
      "November",
      "December"
    ];
    var date = new Date();
    var month = Months[date.getMonth()];
    console.log(month);
    document.querySelector(".Currentmonth").textContent = month;

    document
      .querySelector(UiCtrl.DomStrings.submit)
      .addEventListener("click", AddData);

    // document.addEventListener("keypress",(event)=>{
    //   if(event.keyCode == 13 && event.which == 13){

    // })
    document.addEventListener("keypress", event => {
      if (event.keyCode == 13 || event.which == 13) {
        AddData();
      }
    });

    document
      .querySelector(UiCtrl.DomStrings.container)
      .addEventListener("click", DeleteData);
  }
  function DeleteData(event) {
    var item;
    item = event.target.parentNode.id;
    console.log(item);
    UiCtrl.delList(item);
  }
  function AddData() {
    var newItem;

    newItem = UiCtrl.GetData();
    if (newItem.work !== "" && newItem.Timing !== "") {
      console.log(newItem.work);
      var listItem = dataStr.AddOn(newItem.work, newItem.Timing);
      UiCtrl.AddList(listItem);
      UiCtrl.clearValue();
      dataStr.testing();
    }
  }
  return {
    init: function() {
      Selectors();
    }
  };
})(UiController, dataStructure);

Controller.init();
