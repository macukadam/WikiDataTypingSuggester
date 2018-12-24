var autoCopleteActivated = false;

var finalArray = [];

function searchByOneEntity(varQ) {
    var select = [];
    select.push(varQ);
    var someArray = [];

    for (let i = 0; i < select.length; i++) {
        var splitedArray = select[i].href.split('/');
        var itemQ = splitedArray[splitedArray.length - 1]
        var response = searchQuery("https://www.wikidata.org/wiki/Special:EntityData/" + itemQ + ".json");
        var entities = response.entities;
        for (var entity in entities) {
            var claims = entities[entity].claims;
            var P31 = claims.P31;
            for (var index in P31) {
                var value = P31[index].mainsnak.datavalue.value;
                var id = value.id;
                if (id != null) {
                    someArray.push(id);
                }
            }

            var P279 = claims.P279;
            for (var index in P279) {
                var value = P279[index].mainsnak.datavalue.value;
                var id = value.id;
                if (id != null) {
                    someArray.push(id);
                }
            }
        }
    }
    var diffArray = [];
    finalArray = [];
    finalArray = finalArray.concat(someArray);
    recursivePropSearch(someArray, diffArray);
    return finalArray;
}

function searchByInsance() {
    var searchText = $('#qryinput').val();
    var select = document.querySelectorAll('p > a');
    var someArray = [];

    for (let i = 0; i < select.length; i++) {
        var splitedArray = select[i].href.split('/');
        var itemQ = splitedArray[splitedArray.length - 1]
        var response = searchQuery("https://www.wikidata.org/wiki/Special:EntityData/" + itemQ + ".json");
        var entities = response.entities;
        for (var entity in entities) {
            var claims = entities[entity].claims;
            var P31 = claims.P31;
            for (var index in P31) {
                var value = P31[index].mainsnak.datavalue.value;
                var id = value.id;
                if (id != null) {
                    someArray.push(id);
                }
            }

            var P279 = claims.P279;
            for (var index in P279) {
                var value = P279[index].mainsnak.datavalue.value;
                var id = value.id;
                if (id != null) {
                    someArray.push(id);
                }
            }
        }
    }
    var diffArray = [];
    finalArray = [];
    finalArray = finalArray.concat(someArray);
    recursivePropSearch(someArray, diffArray);
    return finalArray;
}

function recursivePropSearch(givenArray, diffArray) {

    givenArray.forEach(element => {
        var response = searchQuery("https://www.wikidata.org/wiki/Special:EntityData/" + element + ".json");
        var entities = response.entities;
        for (var entity in entities) {
            var claims = entities[entity].claims;
            var P31 = claims.P31;
            for (var index in P31) {
                var value = P31[index].mainsnak.datavalue.value;
                var id = value.id;
                if (id != null) {
                    if (!finalArray.includes(id)) {
                        diffArray.push(id);
                        finalArray.push(id);
                    }
                }
            }

            var P279 = claims.P279;
            for (var index in P279) {
                var value = P279[index].mainsnak.datavalue.value;
                var id = value.id;
                if (id != null) {
                    if (!finalArray.includes(id)) {
                        diffArray.push(id);
                        finalArray.push(id);
                    }
                }
            }
        }

    });
    var newDiffArray = [];
    if (diffArray.length != 0) {
        recursivePropSearch(diffArray, newDiffArray);
    }
}

function getPropertiesFromMemo() {
    var searchText = $('#qryinput').val();
    var select = document.querySelectorAll('p > a');
    var responseArray = [];
    select.forEach(function (val) {
        var splitedArray = val.href.split('/');
        var itemQ = splitedArray[splitedArray.length - 1]
        var response = searchQuery("https://www.wikidata.org/wiki/Special:EntityData/" + itemQ + ".json");
        var entities = response.entities;

        for (var entity in entities) {
            var tempArray = [];
            var claims = entities[entity].claims;
            for (var t in claims) {
                var claim = claims[t];
                for (var k in claim) {
                    try {
                        var value = claim[k].mainsnak.datavalue.value;
                        var id = value.id;
                        if (id != null) {
                            tempArray.push(id);
                        }
                    } catch (error) {

                    }
                }


            }
            responseArray.push(tempArray);
        }
    })
    responseArray.forEach(function (val) {
        alert(val.includes(searchText));
    })
    return responseArray;
}