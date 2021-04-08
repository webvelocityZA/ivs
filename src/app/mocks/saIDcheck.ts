app.controller('ctrlIndex', function ($scope, idValidationService, $window, $timeout) {
    $scope.idNumber = null;
    $scope.result = null;
    $scope.loading = false;
    $scope.setFocus = true;

    
    $scope.isNumber = function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    $scope.$watch('idNumber', function (newValue, oldValue) {
        if (newValue !== oldValue)
            if ($scope.idNumber.length === 13) {
                // Do check
                $scope.loading = true;
                var to = $timeout(function () {
                    $scope.result = idValidationService.checkNumber($scope.idNumber);
                    $scope.loading = false;
                }, 700, true)


            } else {
                $scope.result = null;

                if ($scope.idNumber.length > 13) {
                    $scope.idNumber = $scope.idNumber.substring(0, 13);
                }
            }
    });

    $scope.fnClear = function () {
        $scope.idNumber = null;
        $scope.result = null;
        var element = $window.document.getElementById('searchBox');
        if (element)
            element.focus();
    }

    $timeout(function () {
        if ($ && typeof ($.urlParam) === "function" && $.urlParam('id')) {
            $scope.result = idValidationService.checkNumber($.urlParam('id'));           
        }
    }, 10, true)
});


app.service('idValidationService', function () {
    var that = this;

    // 1 - 6 = Date of birth
    // 7 = Gender identification (0 - 4 is female, 5 - 9 is male)
    // 8 - 10 = Sequential number (not used)
    // 11 = Citizensip (0 = SA, 1 = non SA, 2 = refugee)
    // 12 = race
    // 13 = verification number
    this.checkNumber = function (num) {
        var result = {
            dob: null,
            age: null,
            gender: null,
            citizenship: null,
            race: null,
            error: null,
            isValid: null
        };

        var substrings = {
            dob: num.substring(0, 6),
            gender: num.substring(6, 7),
            citizenship: num.substring(10, 11),
            race: num.substring(11, 12)

        }

        // DOB & Age

        var id = num;
        var yy = id.substring(0, 2);
        var cc = '19';
        if (parseInt(yy) <= moment().format('YY')) {
            cc = '20';
        }
        var ccyy = cc + yy;
        var mm = id.substring(2, 4);
        var dd = id.substring(4, 6);
        var dob = ccyy + '-' + mm + '-' + dd;
        result.dob = new Date(moment(dob, "YYYY-MM-DD"));
        result.age = moment().diff(dob, 'years');

        // Check for valid date
        if (isNaN(result.age)) {
            result.error = 'Invalid ID Number - gender could not be determined';
            return result;
        }
        // Gender
        var genderDigit = parseInt(substrings.gender);
        if (genderDigit >= 0 && genderDigit <= 4)
            result.gender = 'Female';
        else if (genderDigit >= 5 && genderDigit <= 9)
            result.gender = 'Male';
        else {
            result.error = 'Invalid ID Number - gender could not be determined';
            return result;
        }

        // Citizenship
        var citizenshipDigit = parseInt(substrings.citizenship);
        switch (citizenshipDigit) {
            case 0:
                result.citizenship = 'SA Citizen';
                break;
            case 1:
                result.citizenship = 'Non-SA Citizen'; break;
            case 2:
                result.citizenship = 'Refugee'; break;
            default:
                result.error = 'Invalid ID Number - citizenship could not be determined';
                return result;
        }

        // Race
        var raceDigit = parseInt(substrings.race);
        switch (raceDigit) {
            case 8:
                result.race = 'White';
            case 9:
                result.race = 'Black';
            default:
                result.race = null;
        }

        // Date of month


        // Check digit - http://geekswithblogs.net/willemf/archive/2005/10/30/58561.aspx
        result.isValid = that.SAIDCheck(num);

        return result;

    };

    //private method CalcSumOfString
    this.CalcSumOfString = function (ValueToSum) {
        var lenghtOfString = ValueToSum.length;
        var sumOfString = 0;
        for (var i = 0; i < lenghtOfString; i++) {
            sumOfString += parseInt(ValueToSum.substr(i, 1));
        }
        return sumOfString;
    }

    //private method SAIDCheck
    this.SAIDCheck = function (IdNumber) {
        var d1 = 0;
        var d2 = 0;
        var d3 = 0;
        var d4 = 0;
        var d5 = 0;
        var d6 = 0;
        var d7 = 0;
        var d8 = 0;
        var d9 = 0;
        var d10 = 0;
        var d11 = 0;
        var d12 = 0;
        var d13 = 0;
        var evsum = 0;
        var odsum = 0;
        var evnum1 = 0;
        var evnum2 = 0;
        var evnum3 = 0;
        var evnum4 = 0;
        var evnum5 = 0;
        var evnum6 = 0;
        var checkDigit = 0;
        if (IdNumber.length == 13) {
            d1 = parseInt(IdNumber.substr(0, 1), 10);
            d2 = parseInt(IdNumber.substr(1, 1), 10);
            d3 = parseInt(IdNumber.substr(2, 1), 10);
            d4 = parseInt(IdNumber.substr(3, 1), 10);
            d5 = parseInt(IdNumber.substr(4, 1), 10);
            d6 = parseInt(IdNumber.substr(5, 1), 10);
            d7 = parseInt(IdNumber.substr(6, 1), 10);
            d8 = parseInt(IdNumber.substr(7, 1), 10);
            d9 = parseInt(IdNumber.substr(8, 1), 10);
            d10 = parseInt(IdNumber.substr(9, 1), 10);
            d11 = parseInt(IdNumber.substr(10, 1), 10);
            d12 = parseInt(IdNumber.substr(11, 1), 10);
            d13 = parseInt(IdNumber.substr(12, 1), 10);
            evnum1 = (d2 * 2);
            evnum2 = (d4 * 2);
            evnum3 = (d6 * 2);
            evnum4 = (d8 * 2);
            evnum5 = (d10 * 2);
            evnum6 = (d12 * 2);
            evsum = (this.CalcSumOfString(evnum1.toString())) + (this.CalcSumOfString(evnum2.toString())) + (this.CalcSumOfString(evnum3.toString())) + (this.CalcSumOfString(evnum4.toString())) + (this.CalcSumOfString(evnum5.toString())) + (this.CalcSumOfString(evnum6.toString()));
            odsum = d1 + d3 + d5 + d7 + d9 + d11;
            if (((evsum + odsum) % 10) == 0)
                checkDigit = 0;
            else
                checkDigit = 10 - ((evsum + odsum) % 10);

            if (checkDigit != d13)
                return false;
            else
                return true;
        }
        else {
            return false;
        }
    }


});

