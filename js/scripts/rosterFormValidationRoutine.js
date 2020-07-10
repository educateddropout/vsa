
function validateAttendingSchool(value, age){
	msg = "";
	
	if(value == -1){
		msg = "This is required!";
	}
	else {
		if(value == 1){
			if(age < 3 || age > 50){
				msg = "If attending school, age should be 3 to 50 years old.";
			}
		}
	}

	return msg;

}

function validatePregnant(pregnantValue,age,sex){
	msg = '';

	
	if(pregnantValue == -1){
		msg = "This is required!";
	} else {

		if(sex == 'M'){

			if(pregnantValue != "S") msg = "If 'Male', this should be skipped.";

		} else if(sex == 'F') {
			if(age !== ''){
				if(age < 8){
					if(pregnantValue != "S") msg = "Age is below 8 years old, this should be skipped!";
				}
				else{
					if(pregnantValue == "S") msg = "If 'Female' and 8 years old and above, this cannot be skipped";
					else{
						if(pregnantValue == "Y" && age > 50) msg = "50 years old and above, cannot be pregnant";
					}
				}
				
			} else {
				msg = "Please provide age.";
			}

		} else {
			msg = "Please provide 25. SEX.";
		}
	}

	return msg;
}

function validateYear(year, birthdayAgeIndicator){
	

	let msg = "";

	if(birthdayAgeIndicator === true){
		
		if(year == ""){
			msg = "This is required!"
		} else if(! /^[0-9]+$/.test(year)){
			msg = "Invalid input";
		} else if(year.length < 4){
			msg = "should be 4 digit."
		}

	}

	return msg;

}

function validateMonth(month,year){

	let msg = "";

	if(month != ""){
		if(year == ''){
			msg = "Please provide year";
		}
		else if( /^[0-9]+$/.test(month)){
			if(month > 12 || month < 1) msg = "Invalid month";
		} else {
			msg = "Invalid input";
		}
	}

	return msg;

}


function validateDay(day, month, year){

	let msg = "";

	if(day != ""){
		if( /^[0-9]+$/.test(day)){

			if(month == ''){
				msg = "Please provide month";
			}
			else if(year == ''){

				msg = "Please provide year";

			}
			else {
				if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12){

					if(day > 31 || day < 1) msg = "Invalid day";

				} else if(month == 4 || month == 6 || month == 9 || month == 11){

					if(day > 30 || day < 1) msg = "Invalid day";

				} else if(month == 2){

					if((year % 4) != 0){

						if(day > 28 || day < 1) msg = "Invalid day";

					} else {

						if(day > 29 || day < 1) msg = "Invalid day";

					}

				}

				if(day > 31 || day < 1) msg = "Invalid day";
			}

		} else {
			msg = "Invalid input";
		}
	}

	return msg;
}

function validateAge(age, ageCheckboxIndicator){

	let msg = "";

	if( /^[0-9\-]+$/.test(age)){
		if(age > 100){
			msg = "Age should be less 100 and below";
		} else if(age < 0){
			msg = "Not born yet?";
		}
	} else {
		if(ageCheckboxIndicator) msg = "Invalid input";
	}

	return msg;
}

function validateMaritalStatus(maritalStatus, age){

	let msg = "";
	
	if(maritalStatus == -1) msg = "This is required!";
	else {
		if(maritalStatus == 2 || maritalStatus == 3 || maritalStatus == 4 ||  maritalStatus == 5 ||  maritalStatus == 6){
			
			if(age < 8 && age !== "") msg = "Age should be 8 years old and above.";
		}
	}

	return msg;

}

function validateSoloParent(soloParent, age, relHH, maritalStatus){

	let msg = "";
	
	if(soloParent == -1) msg = "This is required!";
	else{
		if(soloParent == 1){
			if(age !== "" && age < 8) msg = "Age should be 8 years old and above.";
			else {
				if(relHH == 1 && (maritalStatus == 2 || maritalStatus == 3 || maritalStatus == 7)){
					msg = "Household head marital status should be 1,4,5 or 6 to be a solo parent";
				}
			}
		}

	}

	return msg;

}

function validateRelHH(relHH, age, householdHeadCount, maritalStatus){

	let msg = "";
	
	if(relHH == -1) msg = "This is required!";
	else {

		if(age !== ""){

			if(relHH == 1){
				if(age < 18) msg = "Household head should be atleast 18 years old.";
				else if(householdHeadCount != 0) msg = "There should be only 1 household head.";
			} else if(relHH == 2) {

				if(age < 8) msg = "Spouse should be atleast 8 years old.";
				else {
					if(!(maritalStatus == 2 || maritalStatus == 3)){
						msg = "Spouse - 27. MS(Marital status) should be married or common - law partner only. Please check!";
					}
				}

			} else if(relHH == 7){
				if(age < 27) msg = "Father/Mother should be 27 years old and above.";
			} else if(relHH == 10){
				if(age < 8) msg = "Domestic helpers should be atleast 8 years old.";
			}

		} else {
			msg = "Please provide 'AGE'."
		}

	}

	return msg;

}

function validateRelFH(relFH, relHH, maritalStatus){

	let msg = "";

	if(relFH == -1) msg = "This is required!";
	else {

		if(relHH != -1){
			if(relHH == 9 || relHH == 10 || relHH == 11){
				if(relFH != 0) msg = "Relationship to Household Head is 9,10 or 11. This should be 0-skipped!";
			} else {
				if(relHH == 1){
					if(relFH == 0) msg = "Relationship to Household Head is not 9,10 or 11. This cannot be 0-skipped!";
					else if(relFH == 3 || relFH == 4){
						 msg = "Relationship to Household Head is 1. Relationship to Family Head should be 1, 2, or 5 only!";
					}
				} else if(relHH == 2){
					if(relFH == 0) msg = "Relationship to Household Head is not 9,10 or 11. This cannot be 0-skipped!";
					else if(relFH == 3 || relFH == 4){
						 msg = "Relationship to Household Head is 2. Relationship to Family Head should be 1, 2, or 5 only!";
					}
				} else if(relHH == 3){

					if(relFH == 0) msg = "Relationship to Household Head is not 9,10 or 11. This cannot be 0-skipped!";
					else if((relFH == 2 || relFH == 5) && maritalStatus == 1){
						 msg = "Relationship to Household Head is 3 and Marital Status is Single. Relationship to Family Head should be 1, 3, or 4 only!";
					}

				}

				if(relFH == 0) msg = "Relationship to Household Head is not 9,10 or 11. This cannot be 0-skipped!";
				else if(relFH == 2){
					if(!(maritalStatus == 2 || maritalStatus == 3)){
						msg = "Spouse - 27. MS(Marital status) should be married or common - law partner only. Please check!";
					}
				}
				

			}
		} else {
			msg = "Please provide 'Relation to Household Head' first!";
		}

	}

	return msg;

}

function validateFamilyNumber(familyNumber, relHH, currentMaxFn){

	let msg = "";

	if(familyNumber == -1) msg = "This is required!";
	else {

		if(!/^(?:[0-9]|0[1-9]|1[0-9]|20)$/.test(familyNumber)){
			msg = "Family Number must be 0 to 20 only!";
		}
		else {
			if(relHH != -1){
				if(relHH == 9 || relHH == 10 || relHH == 11){
					if(familyNumber != 0) msg = "Relationship to Household Head is 9,10 or 11. This should be 0!";
				} else {
					if(familyNumber == 0) msg = "Relationship to Household Head is not 9,10 or 11. This cannot be 0!";
					else{
						let fnDif = familyNumber - currentMaxFn;
						if(fnDif > 1){
							msg = "Family number should be in sequence!";
						}
					}
				}
			} else {
				msg = "Please provide 'Relation to Household Head' first!";
			}
		}

	}

	return msg;

}

function validateHighestEducationAttained(highestEducationAttained,age){

	let msg = "";

	if( highestEducationAttained == -1) msg = "This is required!";
	else {

		if(age !== ""){

				if(highestEducationAttained == 2 && age < 4 ) msg = "Attained kinder should be 4 years old and above";
				else if(highestEducationAttained == 3 && age < 7 ) msg = "Attained grade 1 should be 7 years old above";
				else if(highestEducationAttained == 4 && age < 8 ) msg = "Attained grade 2 should be 8 years old above";
				else if(highestEducationAttained == 5 && age < 9 ) msg = "Attained grade 3 should be 9 years old above";
				else if(highestEducationAttained == 6 && age < 10 ) msg = "Attained grade 4 should be 10 years old above";
				else if(highestEducationAttained == 7 && age < 11 ) msg = "Attained grade 5 should be 11 years old above";
				else if(highestEducationAttained == 8 && age < 12 ) msg = "Attained grade 6 should be 12 years old above";
				else if(highestEducationAttained == 9 && age < 13 ) msg = "Attained grade 7 should be 13 years old above";
				else if(highestEducationAttained == 10 && age < 14 ) msg = "Attained grade 8 should be 14 years old above";
				else if(highestEducationAttained == 11 && age < 15 ) msg = "Attained grade 9 should be 15 years old above";
				else if(highestEducationAttained == 12 && age < 16 ) msg = "Attained grade 10 should be 16 years old above";
				else if(highestEducationAttained == 13 && age < 17 ) msg = "Attained grade 11 should be 17 years old above";
				else if(highestEducationAttained == 14 && age < 18 ) msg = "Attained grade 12 should be 18 years old above";
				else if(highestEducationAttained == 15 && age < 17 ) msg = "Attained 1st year college should be 17 years old above";
				else if(highestEducationAttained == 16 && age < 18 ) msg = "Attained 2nd year college should be 18 years old above";
				else if(highestEducationAttained == 17 && age < 19 ) msg = "Attained 3rd year college should be 19 years old above";
				else if(highestEducationAttained == 18 && age < 20 ) msg = "Attained 4th year college should be 20 years old above";
				else if(highestEducationAttained == 19 && age < 20 ) msg = "College graduate should be 20 years old above";
				else if(highestEducationAttained == 20 && age < 21 ) msg = "(M.A./M.S./Ph.D.) should be 21 years old above";

		} else {
			msg = "Please provide age.";
		}

	}

	return msg;
}

function validateEmployment(employment, age){

	let msg = "";
	if(employment == -1){
		msg = "This is required!";
	} else if(employment == "Y"){
		if(age === ""){
			msg = "Please provide age first!";
		} else if(age < 8){
			msg = "Household member should be 8 years old and above!";
		}
	}

	return msg;

}

function validateOccupation(occupation, employment){

	let msg = "";

	if(occupation == ""){

		if(employment == "Y"){
			msg = "This is required!";
		}

	} else {

		if(employment == -1){ 
			if(occupation != "") msg = "Please provide 'EMPLOYMENT' (40. EMP).";
		}
		else if(employment == "N"){
			msg = "'Employment' is NO. This should be blank";
		} 

	}

	return msg;

}

function validatePsoc(psoc,employment){

	let msg = "";

	let psocCodes = ['0110',
						'0210',
						'0310',
						'1111',
						'1112',
						'1113',
						'1114',
						'1120',
						'1211',
						'1212',
						'1213',
						'1219',
						'1221',
						'1222',
						'1223',
						'1311',
						'1312',
						'1321',
						'1322',
						'1323',
						'1324',
						'1330',
						'1341',
						'1342',
						'1343',
						'1344',
						'1345',
						'1346',
						'1349',
						'1411',
						'1412',
						'1420',
						'1431',
						'1439',
						'2111',
						'2112',
						'2113',
						'2114',
						'2119',
						'2121',
						'2122',
						'2131',
						'2132',
						'2133',
						'2141',
						'2142',
						'2143',
						'2144',
						'2145',
						'2146',
						'2149',
						'2151',
						'2152',
						'2153',
						'2161',
						'2162',
						'2163',
						'2164',
						'2165',
						'2166',
						'2211',
						'2212',
						'2221',
						'2222',
						'2230',
						'2240',
						'2250',
						'2261',
						'2262',
						'2263',
						'2264',
						'2265',
						'2266',
						'2267',
						'2269',
						'2310',
						'2320',
						'2330',
						'2341',
						'2342',
						'2351',
						'2352',
						'2353',
						'2354',
						'2355',
						'2356',
						'2359',
						'2411',
						'2412',
						'2413',
						'2421',
						'2422',
						'2423',
						'2424',
						'2431',
						'2432',
						'2433',
						'2434',
						'2511',
						'2512',
						'2513',
						'2514',
						'2519',
						'2521',
						'2522',
						'2523',
						'2529',
						'2611',
						'2612',
						'2619',
						'2621',
						'2622',
						'2631',
						'2632',
						'2633',
						'2634',
						'2635',
						'2636',
						'2641',
						'2642',
						'2643',
						'2651',
						'2652',
						'2653',
						'2654',
						'2655',
						'2656',
						'2659',
						'3111',
						'3112',
						'3113',
						'3114',
						'3115',
						'3116',
						'3117',
						'3118',
						'3119',
						'3121',
						'3122',
						'3123',
						'3131',
						'3132',
						'3133',
						'3134',
						'3135',
						'3139',
						'3141',
						'3142',
						'3143',
						'3151',
						'3152',
						'3153',
						'3154',
						'3155',
						'3211',
						'3212',
						'3213',
						'3214',
						'3221',
						'3222',
						'3230',
						'3240',
						'3251',
						'3252',
						'3253',
						'3254',
						'3255',
						'3256',
						'3257',
						'3258',
						'3259',
						'3311',
						'3312',
						'3313',
						'3314',
						'3315',
						'3321',
						'3322',
						'3323',
						'3324',
						'3331',
						'3332',
						'3333',
						'3334',
						'3339',
						'3341',
						'3342',
						'3343',
						'3344',
						'3351',
						'3352',
						'3353',
						'3354',
						'3355',
						'3359',
						'3411',
						'3412',
						'3413',
						'3421',
						'3422',
						'3423',
						'3431',
						'3432',
						'3433',
						'3434',
						'3435',
						'3511',
						'3512',
						'3513',
						'3514',
						'3521',
						'3522',
						'4110',
						'4120',
						'4131',
						'4132',
						'4211',
						'4212',
						'4213',
						'4214',
						'4221',
						'4222',
						'4223',
						'4224',
						'4225',
						'4226',
						'4227',
						'4229',
						'4311',
						'4312',
						'4313',
						'4321',
						'4322',
						'4323',
						'4411',
						'4412',
						'4413',
						'4414',
						'4415',
						'4416',
						'4419',
						'5111',
						'5112',
						'5113',
						'5120',
						'5131',
						'5132',
						'5141',
						'5142',
						'5151',
						'5152',
						'5153',
						'5161',
						'5162',
						'5163',
						'5164',
						'5165',
						'5169',
						'5211',
						'5212',
						'5221',
						'5222',
						'5223',
						'5230',
						'5241',
						'5242',
						'5243',
						'5244',
						'5245',
						'5246',
						'5249',
						'5311',
						'5312',
						'5321',
						'5322',
						'5329',
						'5411',
						'5412',
						'5413',
						'5414',
						'5419',
						'6111',
						'6112',
						'6113',
						'6114',
						'6115',
						'6116',
						'6117',
						'6118',
						'6119',
						'6121',
						'6122',
						'6123',
						'6124',
						'6125',
						'6126',
						'6127',
						'6128',
						'6129',
						'6130',
						'6211',
						'6212',
						'6213',
						'6214',
						'6221',
						'6222',
						'6223',
						'6224',
						'6225',
						'6226',
						'6227',
						'6228',
						'6229',
						'6310',
						'6320',
						'6330',
						'6340',
						'7111',
						'7112',
						'7113',
						'7114',
						'7115',
						'7119',
						'7121',
						'7122',
						'7123',
						'7124',
						'7125',
						'7126',
						'7127',
						'7131',
						'7132',
						'7133',
						'7211',
						'7212',
						'7213',
						'7214',
						'7215',
						'7221',
						'7222',
						'7223',
						'7224',
						'7231',
						'7232',
						'7233',
						'7234',
						'7311',
						'7312',
						'7313',
						'7314',
						'7315',
						'7316',
						'7317',
						'7318',
						'7319',
						'7321',
						'7322',
						'7323',
						'7411',
						'7412',
						'7413',
						'7421',
						'7422',
						'7511',
						'7512',
						'7513',
						'7514',
						'7515',
						'7516',
						'7521',
						'7522',
						'7523',
						'7531',
						'7532',
						'7533',
						'7534',
						'7535',
						'7536',
						'7541',
						'7542',
						'7543',
						'7544',
						'7549',
						'8111',
						'8112',
						'8113',
						'8114',
						'8121',
						'8122',
						'8131',
						'8132',
						'8141',
						'8142',
						'8143',
						'8151',
						'8152',
						'8153',
						'8154',
						'8155',
						'8156',
						'8157',
						'8159',
						'8160',
						'8171',
						'8172',
						'8181',
						'8182',
						'8183',
						'8189',
						'8211',
						'8212',
						'8219',
						'8311',
						'8312',
						'8321',
						'8322',
						'8331',
						'8332',
						'8341',
						'8342',
						'8343',
						'8344',
						'8350',
						'9111',
						'9112',
						'9121',
						'9122',
						'9123',
						'9129',
						'9211',
						'9212',
						'9213',
						'9214',
						'9215',
						'9216',
						'9311',
						'9312',
						'9313',
						'9321',
						'9329',
						'9331',
						'9332',
						'9333',
						'9334',
						'9411',
						'9412',
						'9510',
						'9520',
						'9611',
						'9612',
						'9613',
						'9621',
						'9622',
						'9623',
						'9624',
						'9629'
					];

	if(psoc == null || psoc == ''){

		if(employment == "Y"){
			msg = "This is required!";
		}
		
	}
	else {
		if(employment == "Y"){
			
			if(!psocCodes.find(function(code){return code == psoc})){

				msg = "Invalid PSOC code. Please check!";

			}

		} else {
			if(employment == -1){

				msg = "Please provide 'EMPLOYMENT' (40. EMP).";

			}
			else{

				msg = "'Employment' is NO. This should be blank";

			} 


		}
	}

	return msg;

}

function validateClassOfWorker(classOfWorker,employment){

	let msg = "";

	if(classOfWorker == -1){
		msg = "This is required!";
	} else {

		if(employment == 'N'){
			if(classOfWorker != 0) msg = "'Employment' is NO. This should be 0 - skipped.";
		}
		else if(employment == 'Y'){

			if(classOfWorker == 0) msg = "'Employment' is YES. This cannot be 0 - skipped."

		} else {
			msg = "Please provide 'EMPLOYMENT' (40. EMP).";
		}

	}

	return msg;

}

function validateBasisOfPayment(basisOfPayment,employment, classOfWorker){

	let msg = "";

	if(basisOfPayment == -1){

		msg = "This is required!";

	} else {

		if(employment == "N"){
			if(basisOfPayment != 0) msg = "'Employment' is NO. This should be 0 - skipped.";
		}
		else if(employment == "Y"){

			if(classOfWorker != -1){
				if(classOfWorker == 4 || classOfWorker == 5 || classOfWorker == 7){
					if(basisOfPayment != 0) msg = "If 'Class of Worker' is 4,5 or 7. This should be 0 - skipped.";
				} else {
					if(basisOfPayment == 0) msg = "'Employment' is YES and 'Class of Worker' is 1,2,3,6. This cannot be 0 - skipped.";
				}
			} else {
				msg = "Please provide the 'CLASS OF WORKER (43. CW)'."
			}

		} else {
			msg = "Please provide 'EMPLOYMENT' (40. EMP).";
		}
	} 

	return msg;
}

function validateNatureOfEmployment(natureOfEmployment,employment){

	let msg = "";

	if(natureOfEmployment == -1){

		msg = "This is required!";

	} else {

		if(employment == "N"){
			if(natureOfEmployment != 0) msg = "'Employment' is NO. This should be 0 - skipped.";
		}
		else if(employment == "Y"){

			if(natureOfEmployment == 0) msg = "'Employment' is YES. This cannot be 0 - skipped."
				
		} else {
			msg = "Please provide 'EMPLOYMENT' (40. EMP).";
		}
	}

	return msg;

}

function validateOfi(ofi, overseas, age,){

	let msg = "";

	if(ofi == -1){
		msg = "This is required!";
	} else {
		if(age !== ""){
			if(overseas == -1){
				msg = "Please provide 'OVERSEAS' (46. OVE).";
			} else if(overseas == "Y") {
				if( ofi == 0){
					msg = "'OVERSEAS' is yes, this cannot be skipped.";
				} else {
					if(ofi == 1 || ofi == 2 || ofi == 3){
						if(age < 18) msg = "Age is below 18, values (1,2 or 3) are not allowed.";
					}
				}
			} else {
				if(ofi != 0) msg = "'OVERSEAS' is no, this should be skipped."
			}
		} else {
			msg = "Please provide age."
		}
	}

	return msg;

}

function validateSendingMoney(sendingMoney, overseas, ofi){

	let msg = "";

	if(sendingMoney == -1){
		msg = "This is required!";
	} else {
		
		if(overseas == "N"){

			if(sendingMoney != 0) msg = "Overseas is 'NO'. This should be skipped.";

		} else if(overseas == "Y"){

			if(sendingMoney == 0) msg = "Overseas is 'YES'. This cannot be skipped.";

		} else {

			msg = "Please provide 'OVERSEAS'(46. OVE).";
		}
	
	}

	return msg;

}

function validateHowOften(howOften, overseas, sendingMoney){

	let msg = "";

	if(howOften == -1){

		msg = "This is required!";

	} else {

		if(overseas == "Y"){
			
			if(sendingMoney == "Y"){
				if(howOften == 0) msg = "'SENDING MONEY' is yes. This cannot be skipped.";
			}
			else{
				if(sendingMoney == -1) msg = "Please provide 'SENDING MONEY' (48. SM).";
				else {
					if(howOften != "S") msg = "if 'SENDING MONEY' is 'NO' or 'SKIPPED'. This should be skipped.";
				}
			}
			
		} else if(overseas == "N"){

			if(sendingMoney == "Y" || sendingMoney == "S"){
				if(howOften != "S") msg = "if 'SENDING MONEY' is 'NO' or 'SKIPPED'. This should be skipped.";
			}

		} else{

			msg = "Please provide 'OVERSEAS'(46. OVE).";

		}
		
	}

	return msg;

}

/** Checking if family roster has household head
**/

function validateRosters(familyRosters, pageIndicator){

	let msg = "";
	let householdHead = familyRosters.filter(roster => roster.personalInformation.relHH.value == 1 && roster.archive == 0);
	let hhFatherMother = familyRosters.filter(roster => roster.personalInformation.relHH.value == 7 && roster.archive == 0);
	let notYetVerified = familyRosters.filter(roster => roster.verified == -1 && roster.archive == 0);
	let familyHeads = familyRosters.filter(roster => roster.personalInformation.relFH.value == 1 && roster.archive == 0);
	let familyRosterWithFN = familyRosters.filter(roster => roster.personalInformation.relFH.value != 0 && roster.archive == 0);
	//let numberOfSoloParent = familyRosters.filter(roster => roster.personalInformation.soloParent.value == 1 && roster.archive == 0).length;
	let soloParentHH = familyRosters.filter(roster => roster.personalInformation.soloParent.value == 1 && roster.archive == 0 && roster.personalInformation.relHH.value == 1).length;
	let householdType = getHouseholdType(familyRosters);


    let uniqFamilyNumber = _.groupBy(familyRosterWithFN, function(roster) {
    	return roster.personalInformation.familyNumber.value;
    });

    if(soloParentHH > 0){
    	
    	let numberOfMinor = familyRosters.filter(
    		roster => roster.personalInformation.birthdayAge.age.value < 18 && roster.archive == 0 && 
    		roster.personalInformation.maritalStatus.value == 1 &&
    		(roster.personalInformation.relHH.value == 3 || roster.personalInformation.relHH.value == 6)
    		
    	).length;

    	if(numberOfMinor < 1){
    		msg += "Household head is a solo Parent, Household Roster should have atleast 1 minor that is Single with relHH of 3 - Son/Daughter or 6 - Grandson/Daughter. Please check! |";
    	}



    }

    /*if(numberOfSoloParent > 0){
    	let numberOfMinor = familyRosters.filter(
    		roster => roster.personalInformation.birthdayAge.age.value < 18 && roster.archive == 0 &&
    		(roster.personalInformation.relHH.value == 3 || roster.personalInformation.relHH.value == 4 ||
    			roster.personalInformation.relHH.value == 5 || roster.personalInformation.relHH.value == 6 ||
    			roster.personalInformation.relHH.value == 8) && roster.personalInformation.soloParent.value != 1
    	).length;

    	if(numberOfMinor < 1){
    		msg = "Invalid Solo Parent, the minor should be in the household roster. Please check! |";
    	}
    }*/

	if(householdHead.length < 1){
		msg += "Household Head is missing. Please check! |";
	} else if(householdHead.length > 1) {
		msg += "Found more than 1 household head. Please check! |";
	} else {
		let householdHeadAge = householdHead[0].personalInformation.birthdayAge.age.value;
		
		hhFatherMother.forEach(function(roster){
			if(roster.personalInformation.relHH.value == 7){
				hhFatherMotherDiffAge = roster.personalInformation.birthdayAge.age.value - householdHeadAge;
				
				if(hhFatherMotherDiffAge < 8){
					if(roster.personalInformation.sex.value == 1){
						msg += "Father " + roster.personalInformation.firstName.value + " " +
							roster.personalInformation.middleName.value + " " +
							roster.personalInformation.lastName.value + " . Should be 8 years older than household.";
					} else {
						msg += "Mother " + roster.personalInformation.firstName.value + " " +
							roster.personalInformation.middleName.value + " " +
							roster.personalInformation.lastName.value + " . Should be 8 years older than household.";
					}
					
				}
			}
		});
	}

	let familyNumberCount = 0;
	let prevFn = 0;
	let fnNotInSequence = false;

	_.forEach(uniqFamilyNumber, function(families, fn){

		familyHeadCount = 0;
		familySpouseCount = 0;
		familyNumber = 0;

		familyNumberCount++;

		let spouseInFamily = [];
		let anaksInFamily = [];

		families.forEach(function(roster){

			if(roster.personalInformation.relFH.value == 1){
				familyHeadCount++;
			}

			familyNumber = roster.personalInformation.familyNumber.value;

			if(roster.personalInformation.relHH.value == 2){
				spouseInFamily.push(roster);
				familySpouseCount++;
			}
			else if(roster.personalInformation.relHH.value == 3){
				anaksInFamily.push(roster);
			}
			
		});
		


		if(familySpouseCount > 1) msg += " Found "+ familySpouseCount + " Spouses in family number " + familyNumber + ".  Please check!. |";
		else if(familySpouseCount == 1){

			masMatandangAnakCount = 0;

			anaksInFamily.forEach(function(roster){

				if((spouseInFamily[0].personalInformation.birthdayAge.age.value-8) < roster.personalInformation.birthdayAge.age.value) 
					masMatandangAnakCount++;

			});

			if(masMatandangAnakCount > 0) msg += " Spouse should be 8 years older than Son/Daughter in same family.  Please check family number " + familyNumber+ "!. |";

		}

		if(familyHeadCount < 1) msg += " Found "+ familyHeadCount + " Family Head in family number " + familyNumber + ". There should be one family head for each nuclear family. |";
		else if(familyHeadCount > 1) msg += " Found "+ familyHeadCount + " Family Heads in family number " + familyNumber + ". There should only one family head for each nuclear family. |";
		
		prevFn++;
		if(prevFn != fn) fnNotInSequence = true;

		prevFn = fn;

	});

	if(fnNotInSequence) msg += "Family Number is not in sequence. Please check!";

	if(householdType == 'Single Family'){
		if(familyNumberCount > 1) msg += " Household Type is Single Family. There should be only one family. |";
	}

	if(pageIndicator == 'VERIFICATION'){

		if(notYetVerified.length > 0) msg += " | Please verify all encoded roster.";
	}

	return msg.trim();

}

function validateRoster(rosterData, currentMaxFn, householdHeadCount){

    let retVal = false;
    /**

        -- function validateSelection only used to validate fields that no other validation beside REQUIRED
        -- function validateSelection is at js/scripts/commonValidation Routines.js
        -- others is at js/scripts/familyRosterValidationRoutines.js

    */

    let age = rosterData.personalInformation.birthdayAge.age.value;
    let birthDay = rosterData.personalInformation.birthdayAge.birthDay.value;
    let birthMonth = rosterData.personalInformation.birthdayAge.birthMonth.value;
    let birthYear = rosterData.personalInformation.birthdayAge.birthYear.value;

    let firstName = rosterData.personalInformation.firstName.value;
    let middleName = rosterData.personalInformation.middleName.value;
    let lastName = rosterData.personalInformation.lastName.value;

    let sex = rosterData.personalInformation.sex.value;
    let pregnant = rosterData.personalInformation.pregnant.value;
    let maritalStatus = rosterData.personalInformation.maritalStatus.value;
    let soloParent = rosterData.personalInformation.soloParent.value;
    let relHH = rosterData.personalInformation.relHH.value;
    let relFH = rosterData.personalInformation.relFH.value;
    let familyNumber = rosterData.personalInformation.familyNumber.value;

    let seeing = rosterData.functionalDifficulty.seeing.value;
    let hearing = rosterData.functionalDifficulty.hearing.value;
    let walking = rosterData.functionalDifficulty.walking.value;
    let remembering = rosterData.functionalDifficulty.remembering.value;
    let caring = rosterData.functionalDifficulty.caring.value;
    let communicating = rosterData.functionalDifficulty.communicating.value;

    let attendingSchool = rosterData.education.attendingSchool.value;
    let highestEducationAttained = rosterData.education.highestEducationAttained.value;

    let employment = rosterData.employmentInformation.employment.value;
    let occupationEnumerator = rosterData.employmentInformation.occupationEnumerator.value;
    let occupationAreaSupervisor = rosterData.employmentInformation.occupationAreaSupervisor.value;
    let psoc = rosterData.employmentInformation.psoc.value;
    let natureOfEmployment = rosterData.employmentInformation.natureOfEmployment.value;
    let basisOfPayment = rosterData.employmentInformation.basisOfPayment.value;
    let classOfWorker = rosterData.employmentInformation.classOfWorker.value;

    let overseas = rosterData.overseasIndicator.overseas.value;
    let ofi = rosterData.overseasIndicator.ofi.value;
    let sendingMoney = rosterData.overseasIndicator.sendingMoney.value;
    let howOften = rosterData.overseasIndicator.howOften.value;

    rosterData.lineNo.error = validateLineNo(rosterData.lineNo.value);

    rosterData.personalInformation.firstName.error = validateName(firstName, 'FIRSTNAME');
    rosterData.personalInformation.middleName.error = validateName(middleName, 'MIDDLENAME');
    rosterData.personalInformation.lastName.error = validateName(lastName, 'LASTNAME');

    
    if(rosterData.personalInformation.birthdayAge.birthday_checkbox == false && rosterData.personalInformation.birthdayAge.age_checkbox == false){
        rosterData.personalInformation.birthdayAge.error = "Please provide either date of birth or age.";
    } else{
        rosterData.personalInformation.birthdayAge.error = "";
        if(rosterData.personalInformation.birthdayAge.birthday_checkbox == true){
            rosterData.personalInformation.birthdayAge.birthYear.error = validateYear(birthYear,rosterData.personalInformation.birthdayAge.birthday_checkbox);
            rosterData.personalInformation.birthdayAge.birthMonth.error = validateMonth(birthMonth);
            rosterData.personalInformation.birthdayAge.birthDay.error = validateDay(birthDay, birthMonth, birthYear);
        } else if( rosterData.personalInformation.birthdayAge.age_checkbox == true ){
            rosterData.personalInformation.birthdayAge.age.error = validateAge(age,rosterData.personalInformation.birthdayAge.age_checkbox);
        }
    }

    rosterData.personalInformation.sex.error = validateSelections(sex);
    rosterData.personalInformation.relHH.error = validateRelHH(relHH, age, householdHeadCount, maritalStatus);
    rosterData.personalInformation.relFH.error = validateRelFH(relFH, relHH, maritalStatus);
    rosterData.personalInformation.familyNumber.error = validateFamilyNumber(familyNumber, relHH, currentMaxFn);

    // second parameter is to validate if got selected
    rosterData.personalInformation.pregnant.error = validatePregnant(pregnant, age, sex );
    rosterData.personalInformation.maritalStatus.error = validateMaritalStatus(maritalStatus, age);
    rosterData.personalInformation.soloParent.error = validateSoloParent(soloParent, age, relHH, maritalStatus);
    

    rosterData.functionalDifficulty.seeing.error = validateSelections(seeing);
    rosterData.functionalDifficulty.hearing.error = validateSelections(hearing);
    rosterData.functionalDifficulty.walking.error = validateSelections(walking);
    rosterData.functionalDifficulty.remembering.error = validateSelections(remembering);
    rosterData.functionalDifficulty.caring.error = validateSelections(caring);
    rosterData.functionalDifficulty.communicating.error = validateSelections(communicating);

    rosterData.education.attendingSchool.error = validateAttendingSchool(attendingSchool, age);
    rosterData.education.highestEducationAttained.error = validateHighestEducationAttained(highestEducationAttained, age);

    rosterData.employmentInformation.employment.error = validateEmployment(employment,age);
    rosterData.employmentInformation.occupationEnumerator.error = validateOccupation(occupationEnumerator,employment);
    rosterData.employmentInformation.occupationAreaSupervisor.error = validateOccupation(occupationAreaSupervisor,employment);
    rosterData.employmentInformation.psoc.error = validatePsoc(psoc,employment);
    rosterData.employmentInformation.classOfWorker.error = validateClassOfWorker(classOfWorker , employment);
    rosterData.employmentInformation.basisOfPayment.error = validateBasisOfPayment(basisOfPayment, employment, classOfWorker);
    rosterData.employmentInformation.natureOfEmployment.error = validateNatureOfEmployment(natureOfEmployment,employment);

    rosterData.overseasIndicator.overseas.error = validateSelections(overseas);
    rosterData.overseasIndicator.ofi.error = validateOfi(ofi,overseas,age);
    rosterData.overseasIndicator.sendingMoney.error = validateSendingMoney(sendingMoney,overseas,ofi);
    rosterData.overseasIndicator.howOften.error = validateHowOften(howOften,overseas,sendingMoney);

    if(rosterData.personalInformation.birthdayAge.error != "" || rosterData.lineNo.error != "" || rosterData.personalInformation.firstName.error != "" || rosterData.personalInformation.middleName.error != "" || rosterData.personalInformation.lastName.error != "" ||
       rosterData.personalInformation.birthdayAge.age.error != "" || rosterData.personalInformation.sex.error != "" || rosterData.personalInformation.relHH.error != "" || rosterData.personalInformation.pregnant.error != "" ||
       rosterData.personalInformation.maritalStatus.error != "" || rosterData.personalInformation.soloParent.error != "" ||
       rosterData.personalInformation.relFH.error != "" || rosterData.personalInformation.familyNumber.error != ""){ 
        retVal = true;
    }

    if(rosterData.functionalDifficulty.seeing.error != "" || rosterData.functionalDifficulty.hearing.error != "" || rosterData.functionalDifficulty.walking.error != "" ||
        rosterData.functionalDifficulty.caring.error != ""  || rosterData.functionalDifficulty.remembering.error != "" || rosterData.functionalDifficulty.communicating.error != "" ){ 
        retVal = true;
    }

    if(rosterData.education.attendingSchool.error != ""  || rosterData.education.highestEducationAttained.error != "" ){ 
        retVal = true;
    }

    if(rosterData.employmentInformation.employment.error != "" || rosterData.employmentInformation.occupationEnumerator.error != "" || rosterData.employmentInformation.occupationAreaSupervisor.error != "" || rosterData.employmentInformation.psoc.error != "" ||
        rosterData.employmentInformation.classOfWorker.error != "" || rosterData.employmentInformation.basisOfPayment.error != "" || rosterData.employmentInformation.natureOfEmployment.error != "" ){ 
        retVal = true;
    }

    if(rosterData.overseasIndicator.overseas.error != "" || rosterData.overseasIndicator.ofi.error != "" ||
        rosterData.overseasIndicator.sendingMoney.error != "" || rosterData.overseasIndicator.howOften.error != ""){ 
        retVal = true;
    }

    rosterData.hasError = retVal;

    return rosterData;
    
}

function validateSelections(value){
	msg = '';

	if(value == -1){
		msg = "This is required!";
	}

	return msg;
}


