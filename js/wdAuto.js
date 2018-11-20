var autoCopleteActivated = false;

    function autoCompleteSwitch() {
        if (!autoCopleteActivated) {
            createAutoComplete();
            autoCopleteActivated = true;
        } else {
            destroyAutoComplete();
            autoCopleteActivated = false;
        }
    }

    function destroyAutoComplete() {
        $('#textarea').textcomplete('destroy');
    }

    function createAutoComplete() {
        var words = [];
        var data = {};
        $('textarea').textcomplete([{
            match: /(^|\b)(\w{2,})$/,
            search: function (term, callback) {
                data = searchTextOnWikidata(term);
                words = [];
                data.search.forEach(element => {
                    words.push(element.label);
                });
                callback($.map(words, function (word) {
                    return word;
                }));
            },
            replace: function (word) {
                return word + ' ';
            }
        }], {
            maxCount: 20,
            onKeydown: function (e, commands) {
                if (e.keyCode === 39) {
                    var activeLi = $("ul[id*=textcomplete-dropdown-1] li.active");
                    var activeIndex = activeLi.index();

                    imageQ = "https://www.wikidata.org/w/api.php?action=wbgetclaims&entity=" + data.search[
                            activeIndex].title +
                        "&property=P18&format=json"

                    imageSource = '';

                    try {
                        var imgText = searchQuery(imageQ).claims.P18[0].mainsnak.datavalue.value.split(' ')
                            .join(
                                '_');
                        var hash = md5(imgText);
                        var a = hash.substring(0, 1);
                        var b = hash.substring(1, 2);
                        imageSource = "https://upload.wikimedia.org/wikipedia/commons/" + a + "/" + a + b +
                            "/" + imgText;
                    } catch (e) {
                        console.log("Image not found");
                    }

                    openDiag(words[activeIndex], imageSource, data.search[activeIndex].description);
                    return true;
                }
            }
        });
    }

function closeDiag() {
    $('#textcomplete-dropdown-1').show();
}

function openDiag(title, imgSource, content) {
    $('#textcomplete-dropdown-1').hide();
    $("#editor").append('<h1><a id="diagTitle" href="">' + title + '</a></h1>')
        .append('<img id="diagImage"  height="250" width="250" src="' + imgSource + '" alt="Image not found";>')
        .append('<p id="diagContent">' + content + '</p>')
        .append('<button data-dialog-close onclick="closeDiag()">Close</button>')
        .dialog({});
}

function searchTextOnWikidata(text) {
    const Http = new XMLHttpRequest();
    const url = wdk.searchEntities(text, 'en', 20, 'json');
    Http.open("GET", url, false);
    Http.send();

    if (Http.readyState == 4 && Http.status == 200) {
        var response = JSON.parse(Http.response);
        return response;
    }
}

function searchQuery(imgQuey) {
    const Http = new XMLHttpRequest();
    const url = imgQuey
    Http.open("GET", url, false);
    Http.send();
    if (Http.readyState == 4 && Http.status == 200) {
        var response = JSON.parse(Http.response);
        return response;
    }
}