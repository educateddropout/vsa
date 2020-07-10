function convertRosters(rosters){

	let returnValue = [];

	rosters.forEach(function(roster, index){

		returnValue.push({
                id : roster.roster_id,
                archive : 0, // means active 1 means delete
                firstName : { value : roster.first_name, error : '' },
                middleName : { value : roster.middle_name, error : '' },
                lastName : { value : roster.last_name, error : '' },
                extName : { value : roster.ext_name, error : '' },
                birthdayAge : {
                    birthdayCheckbox : roster.birth_year !== null ? true : false,
                    ageCheckbox : roster.birth_year === null ? true : false,
                    birthMonth : { value :  roster.birth_month === null ? '' : roster.birth_month, error : ''  },
                    birthDay : { value :  roster.birth_day === null ? '' : roster.birth_day, error : '' },
                    birthYear : { value : roster.birth_year === null ? '' : roster.birth_year, error : '' },
                    age : { value :  roster.assessment_age, error : '' },
                    error : ''
                },
                sex : { value : roster.sex, error : '' },
                pregnant : { value : roster.is_pregnant, error : '' },
                maritalStatus : { value : roster.marital_status, error : '' },
                soloParent : { value : roster.solo_parent, error : '' },
                relHH : {  value : roster.rel_hh, error : '' },
                relFH : { value : roster.rel_fh, error : '' },
                familyNumber : { value : roster.family_number, error : '' },
                attendingSchool : { value : roster.is_attending_sch, error : '' },
                highestEducationAttained : { value : roster.hea, error : '' },
                seeing : { value : roster.diff_see, error : '' },
                hearing : { value : roster.diff_hear, error : '' },
                walking : {  value : roster.diff_walk,  error : '' },
                remembering : { value : roster.diff_rem, error : '' },
                caring : { value : roster.diff_care, error : '' },
                communicating : { value : roster.diff_com, error : '' },
                employment : { value : roster.is_employed, error : '' },
                occupationEnumerator : { value : roster.occupation_enumerator, error : '' },
                occupationAreaSupervisor : { value : roster.occupation_area_supervisor, error : '' },
                psoc : { value : roster.psoc, error : '' },
                classOfWorker : { value : roster.class_of_worker, error : '' },
                basisOfPayment : { value : roster.basis_of_payment, error : '' },
                natureOfEmployment : { value : roster.nature_of_employment, error : '' },
                overseas : { value : roster.is_overseas, error : '' },
                ofi : { value : roster.ofi, error : '' },
                sendingMoney : { value : roster.is_sending_money, error : '' },
                howOften : { value : roster.how_often, error : '' },
                hasError : false,
                addCtr : 1 // 1 - from db, 2 - added, 3 updated
            });

	});

	return returnValue;

}