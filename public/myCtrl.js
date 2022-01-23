app.controller("myCtrl",function($scope){
    $scope.sauce=[];
    $scope.initPage=function(){
        firebase.initializeApp({
            apiKey: "AIzaSyCsFaeNZaBALKMTQU8wAFVY1E_R1rUKuBA",
            authDomain: "personal-site-361fa.firebaseapp.com",
            projectId: "personal-site-361fa",
          });
       $scope.db=firebase.firestore();
       $scope.refreshList();
    };
    $scope.refreshList=function(){
        $scope.db.collection("Codes").get().then((querySnapshot) => {
            $scope.sauce=[]
            querySnapshot.forEach((doc) => {
                var sau=doc.data();
                sau.id=doc.id
                $scope.sauce.push(sau);
            })
            $scope.$apply();
        });
    }
    $scope.addSauce = function(){
        $scope.db.collection("Codes").add(
            {code:$scope.code}
        )
        .then((docRef) => {
            $scope.refreshList();
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    }
});