function validateName(name, nameIndicator){

	let msg = "";

	if(name != ""){

		if(nameIndicator === 'ADDRESS'){
			if (! /^[a-zA-ZÃ‘ÃÑñ±0-9'Ãƒ.,()#\-\s]+$/.test(name))   msg = "Found invalid character! Please Check..";
		} else {
			
			if(! /^[a-zA-ZÃ‘ÃÑñ±0-9'Ãƒ\-\s]+$/.test(name))msg = "Found invalid character! Please Check..";
		
		}

	} else {

		if(nameIndicator === 'LASTNAME'){

			msg = "This is required!";

		}

	}
	
	return msg;
}

function validateSelection(data){

	let msg = "";

	if(data == -1){
		msg = "This is required!";
	}
	
	return msg;

}

function validateBirthDate(mm, dd, yyyy){

	let retVal = "";


	if(mm == '' || dd == '' || yyyy == ''){	
		if(mm == '' && dd == '' && yyyy == ''){
			retVal = "Birthdate is required";
		}
		else{
			

			retVal += "Missing ";

			if(mm == '') retVal +=  "mm, ";
			if(dd == '') retVal +=  "dd, ";
			if(yyyy == '') retVal +=  "yyyy, ";

			retVal = retVal.slice(0 , -2);
		}

	}
	else {
		if(mm == 1 || mm == 3 || mm == 5 || mm == 7 || mm == 8 || mm == 10 || mm == 12){

			if(dd > 31 || dd < 1) retVal = "Invalid Birthday";

		} else if(mm == 4 || mm == 6 || mm == 9 || mm == 11){

			if(dd > 30 || dd < 1) retVal = "Invalid Birthday";

		} else if(mm == 2){

			if((yyyy % 4) != 0){

				if(dd > 28 || dd < 1) retVal = "Invalid Birthday";

			} else {

				if(dd > 29 || dd < 1) retVal = "Invalid Birthday";

			}

		} 



		
	}

	if(retVal == ''){

		let dt = new Date();
		cdd = dt.getDate();
		cmm = dt.getMonth()+1; 
		cyyyy = dt.getFullYear();
		if(cdd < 10) cdd = '0'+cdd;
		if(cmm < 10) cmm = '0'+cmm;

		cdate = cyyyy + cmm + cdd + '';
		bdate = yyyy + mm + dd + '';

		if(bdate > cdate) retVal = "Birthday should not be future date";
		else {
			age = cyyyy - yyyy;
			if(cmm < mm) age--;
			else if(cmm == mm && cdd < dd) age--;

			if(age < 12) retVal = "Age should be 12 years old and above.";
			
		}
	}

	return retVal;
}

function searchNames(name){

	let msg = "";

	if(name != ""){

		if (! /^[a-zA-ZÃ‘Ã±0-9'Ãƒ.\-\s]+$/.test(name)) {
		    // Validation failed
		    msg = "Found invalid character! Please Check..";

		}

	} else {

		msg = "This is required!";


	}
	
	return msg;
}

function validateTr08Changes(orig, updated){

	let retVal = "";
	let origHash = orig.region_code + orig.province_code + orig.city_code + orig.barangay_code + orig.purok_sitio + orig.street_address;
	let updatedHash = updated.region_code + updated.province_code + updated.city_code + updated.barangay_code + updated.purok_sitio + updated.street_address;

	if(origHash.trim() === updatedHash.trim()){
		retVal = "TR01 grievance type should have change/s in address.";
	}

	return retVal;
}

function validateUpdateChanges(orig, updated){

	let retVal = "";
	let origHash = orig.first_name + orig.middle_name + orig.last_name + orig.ext_name + orig.sex;
	let updatedHash = updated.firstName.value + updated.middleName.value + updated.lastName.value + updated.extName.value + updated.sex.value;

	if(origHash.trim() === updatedHash.trim()){
		retVal = "No changes made.";
	}

	return retVal;
}

function validateUpdateChangesRoster(orig, updated){

	let retVal = "";

	if(JSON.stringify(orig) != JSON.stringify(updated)){
        retVal = "";
    }

	return retVal;

}

function validateEr01Changes(origHousehold, updatedHousehold, origRoster, updatedRoster){

	let retVal = "";
	let origHash = origHousehold.purok_sitio + origHousehold.street_address;
	let updatedHash = updatedHousehold.purok_sitio + updatedHousehold.street_address;

	for(index = 0; index < origRoster.length; index++){
		origHash += origRoster[index].first_name + origRoster[index].middle_name + origRoster[index].last_name + origRoster[index].ext_name + origRoster[index].sex;
		updatedHash += updatedRoster[index].first_name + updatedRoster[index].middle_name + updatedRoster[index].last_name + updatedRoster[index].ext_name + updatedRoster[index].sex;
	}

	if(origHash.trim() === updatedHash.trim()){
		retVal = "No changes made.";
	}

	return retVal;
}

function validateEmail(input){

	let retVal = "";


	if (input != '' && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input))){
		retVal = "You have entered an invalid Email Address!";
	}

    return retVal;

}

function validateContactNumber(input){

	let retVal = "";
	inputLength = input.length;

	if(! /^[0-9]+$/.test(input)){
		retVal = "Invalid Contact Number.";
	} else{

		if(inputLength == 11 && input.substring(0,2) != '09'){
			retVal = "Cellphone number should start in '09'.";
		}else if(inputLength < 7){
			retVal = "Contact number length should be 8, 9, 10, 11. Including area code.";
		}
		
	}

    return retVal;

}

function validateRemarks(input, complaintType){

	let msg = "";

	if(input != ""){

		if (! /^[a-zA-ZÃ‘ÃÑñ±0-9'Ãƒ.,()#\-\s]+$/.test(input)) {
		    // Validation failed
		    msg = "Found invalid character! Please Check..";
		}

	} else {

		if(complaintType == 4){
			msg = "Complaint Type is INC01. This is required!";
		}

		if(complaintType == 5){
			msg = "Complaint Type is INC02. This is required!";
		}
		

	}
	
	return msg;
}