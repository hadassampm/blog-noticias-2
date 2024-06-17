angular.module("blog", []);

angular.module("blog").controller("Rest", function ($scope, $http) {
  $http
    .get("https://api-fake-blog.onrender.com/postagens")
    .then(function (response) {
      $scope.publicacoes = response.data;
    });
});

angular.module("blog").controller("DetailsController", [
  "$scope",
  "$http",
  function ($scope, $http) {
    // Pega a URL
    var url = window.location.href;
    console.log(url);

    //'id' da URL com tratamento para evitar erros
    var id = null;
    if (url.includes("?")) {
      var params = url.split("?")[1].split("&");
      for (var i = 0; i < params.length; i++) {
        var param = params[i].split("=");
        if (param[0] === "id") {
          id = param[1];
          break;
        }
      }
    }

    if (id) {
      //requisição para obter os detalhes da postagem
      $http
        .get("https://api-fake-blog.onrender.com/postagem/" + id)
        .then(function (response) {
          $scope.publicacao = response.data;
        });
    } else {
      console.error("Parâmetro id não encontrado na URL");
    }
  },
]);
