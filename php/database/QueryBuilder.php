<?php

class QueryBuilder

{

	protected $pdo;

	public function __construct($pdo, $decryptor)

	{

		$this->pdo = $pdo;

		$this->decryptor = $decryptor;

	}

	public function fetchStatGrievanceType($code, $statCtr){

		if($statCtr == 1){

			$statement = $this->pdo->prepare("SELECT p.province_code AS 'code', p.province_name AS 'name',

												SUM(IF(complaint_type = 1,1,0)) AS 'c_1',
												SUM(IF(complaint_type = 2,1,0)) AS 'c_2',
												SUM(IF(complaint_type = 3,1,0)) AS 'c_3',
												SUM(IF(complaint_type = 4,1,0)) AS 'c_4',
												SUM(IF(complaint_type = 5,1,0)) AS 'c_5',
												SUM(IF(complaint_type = 6,1,0)) AS 'c_6',
												SUM(IF(complaint_type = 7,1,0)) AS 'c_7',
												SUM(IF(complaint_type = 8,1,0)) AS 'c_8',
												count(1) AS 'total'

												FROM lib_provinces p

												LEFT JOIN tbl_grievance g ON p.province_code = g.complainant_province_code
												WHERE p.region_code = ? 
												GROUP BY p.province_code WITH ROLLUP");
			

		} else if($statCtr == 2){

			$statement = $this->pdo->prepare("SELECT p.city_code AS 'code', p.city_name AS 'name',

												SUM(IF(complaint_type = 1,1,0)) AS 'c_1',
												SUM(IF(complaint_type = 2,1,0)) AS 'c_2',
												SUM(IF(complaint_type = 3,1,0)) AS 'c_3',
												SUM(IF(complaint_type = 4,1,0)) AS 'c_4',
												SUM(IF(complaint_type = 5,1,0)) AS 'c_5',
												SUM(IF(complaint_type = 6,1,0)) AS 'c_6',
												SUM(IF(complaint_type = 7,1,0)) AS 'c_7',
												SUM(IF(complaint_type = 8,1,0)) AS 'c_8',
												count(1) AS 'total'

												FROM lib_cities p

												LEFT JOIN tbl_grievance g ON p.city_code = g.complainant_city_code
												WHERE p.province_code = ? 
												GROUP BY p.city_code WITH ROLLUP");
			

		} else if($statCtr == 3){

			$statement = $this->pdo->prepare("SELECT p.barangay_code AS 'code', p.barangay_name AS 'name',

												SUM(IF(complaint_type = 1,1,0)) AS 'c_1',
												SUM(IF(complaint_type = 2,1,0)) AS 'c_2',
												SUM(IF(complaint_type = 3,1,0)) AS 'c_3',
												SUM(IF(complaint_type = 4,1,0)) AS 'c_4',
												SUM(IF(complaint_type = 5,1,0)) AS 'c_5',
												SUM(IF(complaint_type = 6,1,0)) AS 'c_6',
												SUM(IF(complaint_type = 7,1,0)) AS 'c_7',
												SUM(IF(complaint_type = 8,1,0)) AS 'c_8',
												count(1) AS 'total'

												FROM lib_brgy p

												LEFT JOIN tbl_grievance g ON p.barangay_code = g.complainant_barangay_code
												WHERE p.city_code = ? 
												GROUP BY p.barangay_code WITH ROLLUP");
			

		}

		$statement->execute([$code]);

		return $statement->fetchAll(PDO::FETCH_ASSOC);
		
	}

	public function searchNames($data){

		$lastName = $data['lastName'];
		$fLastName = substr($data['lastName'], 0,1);
		$firstName = $data['firstName'];
		$fFirstName = substr($data['firstName'], 0,1);
		$middleName = $data['middleName'];
		$fMiddleName = substr($data['middleName'], 0,1);

		if($data['firstName'] === "" && $data['middleName']  === ""){

			$statement = $this->pdo->prepare("SELECT AES_DECRYPT(first_name,?) as first_name, 
													AES_DECRYPT(middle_name,?) as middle_name, AES_DECRYPT(last_name,?) as last_name,
													AES_DECRYPT(ext_name,?) as ext_name, hh_id, sex, AES_DECRYPT(birthdate,?) as birthdate
												FROM tbl_family_roster
												WHERE AES_DECRYPT(last_name,?) = ? AND f_last_name = ?");

			$statement->execute([$this->decryptor[0], $this->decryptor[1], $this->decryptor[2], $this->decryptor[7], $this->decryptor[3],
									 $this->decryptor[2], $lastName, $fLastName]);

			if($statement->rowCount() === 0){
				$lastName = $data['lastName']."%";
				$statement = $this->pdo->prepare("SELECT AES_DECRYPT(first_name,?) as first_name, 
													AES_DECRYPT(middle_name,?) as middle_name, AES_DECRYPT(last_name,?) as last_name,
													AES_DECRYPT(ext_name,?) as ext_name, hh_id, sex, AES_DECRYPT(birthdate,?) as birthdate
												FROM tbl_family_roster
												WHERE AES_DECRYPT(last_name,?) like ? AND f_last_name = ?");

				$statement->execute([$this->decryptor[0], $this->decryptor[1], $this->decryptor[2], $this->decryptor[7], $this->decryptor[3],
									 	$this->decryptor[2], $lastName, $fLastName]);

			}

		} else if($data['firstName'] !== "" && $data['middleName']  === ""){
			
			$statement = $this->pdo->prepare("SELECT AES_DECRYPT(first_name,?) as first_name, 
													AES_DECRYPT(middle_name,?) as middle_name, AES_DECRYPT(last_name,?) as last_name,
													AES_DECRYPT(ext_name,?) as ext_name, hh_id, sex, AES_DECRYPT(birthdate,?) as birthdate
												FROM tbl_family_roster
												WHERE AES_DECRYPT(last_name,?) = ? AND f_last_name = ?
													AND  AES_DECRYPT(first_name,?) = ? AND f_first_name = ?");

			$statement->execute([$this->decryptor[0], $this->decryptor[1], $this->decryptor[2], $this->decryptor[7], $this->decryptor[3],
									 $this->decryptor[2], $lastName, $fLastName,$this->decryptor[0], $firstName, $fFirstName]);
			

			if($statement->rowCount() === 0){

				$lastName = $data['lastName']."%";
				$firstName = $data['firstName']."%";

				$statement = $this->pdo->prepare("SELECT AES_DECRYPT(first_name,?) as first_name, 
													AES_DECRYPT(middle_name,?) as middle_name, AES_DECRYPT(last_name,?) as last_name,
													AES_DECRYPT(ext_name,?) as ext_name, hh_id, sex, AES_DECRYPT(birthdate,?) as birthdate
												FROM tbl_family_roster
												WHERE AES_DECRYPT(last_name,?) like ? AND f_last_name = ?
													AND  AES_DECRYPT(first_name,?) like ? AND f_first_name = ?");

				$statement->execute([$this->decryptor[0], $this->decryptor[1], $this->decryptor[2], $this->decryptor[7], $this->decryptor[3],
									 	$this->decryptor[2], $lastName, $fLastName,$this->decryptor[0], $firstName, $fFirstName]);
			}

		} else if($data['firstName'] === "" && $data['middleName']  !== ""){
			$statement = $this->pdo->prepare("SELECT AES_DECRYPT(first_name,?) as first_name, 
													AES_DECRYPT(middle_name,?) as middle_name, AES_DECRYPT(last_name,?) as last_name,
													AES_DECRYPT(ext_name,?) as ext_name, hh_id, sex, AES_DECRYPT(birthdate,?) as birthdate
												FROM tbl_family_roster
												WHERE AES_DECRYPT(last_name,?) = ? AND f_last_name = ?
													AND  AES_DECRYPT(middle_name,?) = ? AND f_middle_name = ?");

			$statement->execute([$this->decryptor[0], $this->decryptor[1], $this->decryptor[2], $this->decryptor[7], $this->decryptor[3],
									 $this->decryptor[2], $lastName, $fLastName,$this->decryptor[1], $middleName, $fMiddleName]);

			if($statement->rowCount() === 0){
				
				$lastName = $data['lastName']."%";
				$middleName = $data['middleName']."%";

				$statement = $this->pdo->prepare("SELECT AES_DECRYPT(first_name,?) as first_name, 
													AES_DECRYPT(middle_name,?) as middle_name, AES_DECRYPT(last_name,?) as last_name,
													AES_DECRYPT(ext_name,?) as ext_name, hh_id, sex, AES_DECRYPT(birthdate,?) as birthdate
												FROM tbl_family_roster
												WHERE AES_DECRYPT(last_name,?) like ? AND f_last_name = ?
													AND  AES_DECRYPT(middle_name,?) like ? AND f_middle_name = ?");

				$statement->execute([$this->decryptor[0], $this->decryptor[1], $this->decryptor[2], $this->decryptor[7], $this->decryptor[3],
									 	$this->decryptor[2], $lastName, $fLastName,$this->decryptor[1], $middleName, $fMiddleName]);

			}

		} else if($data['firstName'] !== "" && $data['middleName']  !== ""){
			$statement = $this->pdo->prepare("SELECT AES_DECRYPT(first_name,?) as first_name, 
													AES_DECRYPT(middle_name,?) as middle_name, AES_DECRYPT(last_name,?) as last_name,
													AES_DECRYPT(ext_name,?) as ext_name, hh_id, sex, AES_DECRYPT(birthdate,?) as birthdate
												FROM tbl_family_roster
												WHERE AES_DECRYPT(last_name,?) = ? AND f_last_name = ?
													AND  AES_DECRYPT(first_name,?) = ? AND f_first_name = ?
													AND  AES_DECRYPT(middle_name,?) = ? AND f_middle_name = ?");

			$statement->execute([$this->decryptor[0], $this->decryptor[1], $this->decryptor[2], $this->decryptor[7], $this->decryptor[3],
									$this->decryptor[2], $lastName, $fLastName,$this->decryptor[0], $firstName, $fFirstName,
									$this->decryptor[1], $middleName, $fMiddleName]);

			if($statement->rowCount() === 0){
				
				$lastName = $data['lastName']."%";
				$firstName = $data['firstName']."%";
				$middleName = $data['middleName']."%";

				$statement = $this->pdo->prepare("SELECT AES_DECRYPT(first_name,?) as first_name, 
													AES_DECRYPT(middle_name,?) as middle_name, AES_DECRYPT(last_name,?) as last_name,
													AES_DECRYPT(ext_name,?) as ext_name, hh_id, sex, AES_DECRYPT(birthdate,?) as birthdate
												FROM tbl_family_roster
												WHERE AES_DECRYPT(last_name,?) like ? AND f_last_name = ?
													AND  AES_DECRYPT(first_name,?) like ? AND f_first_name = ?
													AND  AES_DECRYPT(middle_name,?) like ? AND f_middle_name = ?");

				$statement->execute([$this->decryptor[0], $this->decryptor[1], $this->decryptor[2], $this->decryptor[7], $this->decryptor[3],
									 	$this->decryptor[2], $lastName, $fLastName,$this->decryptor[0], $firstName, $fFirstName,
										$this->decryptor[1], $middleName, $fMiddleName]);

			}

		}

		return $statement->fetchAll(PDO::FETCH_ASSOC);
	}

	public function fetchHouseholdDetail($data){

		$statement = $this->pdo->prepare("SELECT th.hh_id, th.region_code, th.province_code, th.city_code, th.barangay_code, lr.region_name, lp.province_name, lc.city_name, lb.barangay_name, th.purok_sitio, th.street_address, th.type_of_hh, th.respondent, th.poor
											FROM tbl_household th
											INNER JOIN lib_regions lr ON th.region_code = lr.region_code
											INNER JOIN lib_provinces lp ON th.province_code = lp.province_code
											INNER JOIN lib_cities lc ON th.city_code = lc.city_code
											INNER JOIN lib_brgy lb ON th.barangay_code = lb.barangay_code

											WHERE th.hh_id = ?");

		$statement->execute([$data['hhid']]);

		return $statement->fetchAll(PDO::FETCH_ASSOC);

	}

	public function fetchGrievanceByUser($userId){

		$statement = $this->pdo->prepare("SELECT *
											FROM tbl_grievance
											WHERE last_modified_by = ? 
											ORDER BY last_modified DESC
											LIMIT 10 ");

		$statement->execute([$userId]);

		return $statement->fetchAll(PDO::FETCH_ASSOC);
	}

	public function fetchGrievanceByDate($ctr){

		if($ctr == 1){
			$statement = $this->pdo->prepare("SELECT *
												FROM tbl_grievance
												WHERE date(last_modified) >= NOW() - INTERVAL 3 DAY
												ORDER BY last_modified DESC");
		} else {
			$statement = $this->pdo->prepare("SELECT *
												FROM tbl_grievance
												ORDER BY last_modified DESC");
		}

		$statement->execute([]);

		return $statement->fetchAll(PDO::FETCH_ASSOC);
	}

	public function fetchEx01($barangayCode){

		$archive = 0;
		$complaintType = 2;
		
		$statement = $this->pdo->prepare("SELECT *
											FROM tbl_grievance_form
											WHERE complaint_type = ? AND archive = ? AND barangay_code = ?
											ORDER BY last_name, first_name, middle_name DESC");

		$statement->execute([$complaintType, $archive, $barangayCode]);

		return $statement->fetchAll(PDO::FETCH_ASSOC);
	}

	public function fetchInc01($barangayCode){

		$archive = 0;
		$complaintType = 4;
		
		$statement = $this->pdo->prepare("SELECT *
											FROM tbl_grievance_form
											WHERE complaint_type = ? AND archive = ? AND barangay_code = ?
											ORDER BY last_name, first_name, middle_name DESC");

		$statement->execute([$complaintType, $archive, $barangayCode]);

		return $statement->fetchAll(PDO::FETCH_ASSOC);
	}

	public function fetchRosterDetail($data){

		$statement = $this->pdo->prepare("SELECT uuid as 'roster_id', hh_id, AES_DECRYPT(first_name,?) as first_name,
		 										AES_DECRYPT(middle_name,?) as middle_name, AES_DECRYPT(last_name,?) as last_name,
												AES_DECRYPT(ext_name,?) as ext_name, sex, is_pregnant, rel_hh, AES_DECRYPT(birthdate,?) as birthdate,
												AES_DECRYPT(birth_day,?) as birth_day, AES_DECRYPT(birth_month,?) as birth_month, AES_DECRYPT(birth_year,?) as birth_year, assessment_age, is_pregnant, marital_status, solo_parent, rel_hh, rel_fh, family_number,
												diff_see, diff_hear, diff_walk, diff_rem, diff_care, diff_com, is_attending_sch, hea, is_employed, 
												occupation_enumerator, occupation_area_supervisor, psoc, class_of_worker, basis_of_payment, nature_of_employment,
												is_overseas, how_often, ofi, is_sending_money

											FROM tbl_family_roster

											WHERE hh_id = ?
											ORDER BY rel_hh, last_name, first_name, last_modified");

		$statement->execute([$this->decryptor[0], $this->decryptor[1], $this->decryptor[2], $this->decryptor[7], $this->decryptor[3], $this->decryptor[4], $this->decryptor[5], $this->decryptor[6],$data['hhid']]);
		
		return $statement->fetchAll(PDO::FETCH_ASSOC);

	}

	public function fetchUnsync($userId){

		$synced = 'N'; // not yet synced
		$archive = 0; // active

		$statement = $this->pdo->prepare("SELECT ct.uuid, ct.first_name, ct.middle_name, ct.last_name, lb.barangay_name, ct.ext_name, 
												ct.complainant_barangay_code, 
												ct.last_modified, ct.complaint_type
											FROM tbl_grievance ct
											INNER JOIN lib_brgy lb
												ON ct.complainant_barangay_code = lb.barangay_code
											WHERE is_sync = ? and archive = ? and last_modified_by = ?
											ORDER BY last_modified");

		$statement->execute([$synced, $archive, $userId]);
		
		return $statement->fetchAll(PDO::FETCH_ASSOC);

	}

	public function fetchGrievanceToSync($grievanceId, $grievanceType){

		$returnValue = array();

		$statement = $this->pdo->prepare("SELECT *
											FROM tbl_grievance
											WHERE uuid = ?");

		$statement->execute([$grievanceId]);

		array_push($returnValue, $statement->fetchAll(PDO::FETCH_ASSOC));

		$statement = $this->pdo->prepare("SELECT *
											FROM searched_names
											WHERE complaint_id = ?");

		$statement->execute([$grievanceId]);

		array_push($returnValue, $statement->fetchAll(PDO::FETCH_ASSOC));

		if($grievanceType == 8){
			
			$statement = $this->pdo->prepare("SELECT barangay_code, region_code, province_code, city_code, purok_sitio, street_address, hh_id
											FROM tbl_household
											WHERE hh_id = ?");

			$statement->execute([$returnValue[0][0]['hh_id']]);

			array_push($returnValue, $statement->fetchAll(PDO::FETCH_ASSOC));
			
		}

		return $returnValue;

	}

	public function fetchLibRegions(){

		$statement = $this->pdo->prepare("SELECT region_code, region_name
											FROM lib_regions
											ORDER BY order_seq");

		$statement->execute();
		
		return $statement->fetchAll(PDO::FETCH_ASSOC);

	}

	public function fetchLibProvinces($data){

		$statement = $this->pdo->prepare("SELECT province_code, province_name
											FROM lib_provinces
											WHERE region_code = ?
											ORDER BY order_seq");

		$statement->execute([$data]);
		
		return $statement->fetchAll(PDO::FETCH_ASSOC);

	}

	public function fetchLibCities($data){

		$statement = $this->pdo->prepare("SELECT city_code, city_name
											FROM lib_cities
											WHERE province_code = ?
											ORDER BY order_seq");

		$statement->execute([$data]);
		
		return $statement->fetchAll(PDO::FETCH_ASSOC);

	}

	public function fetchLibBarangay($data){

		$statement = $this->pdo->prepare("SELECT barangay_code, barangay_name
											FROM lib_brgy
											WHERE city_code = ?
											ORDER BY order_seq");

		$statement->execute([$data]);
		
		return $statement->fetchAll(PDO::FETCH_ASSOC);

	}

	public function updateGrievanceAsSynced($grievanceId){

		$synced = 'Y'; // YES

		$statement = $this->pdo->prepare("UPDATE tbl_grievance 
												SET is_sync = ?
												WHERE uuid = ?");

		$statement->execute([$synced, $grievanceId]);

		return $statement->rowCount();

	}

	public function updateGrievanceList($grievanceList, $userId){

		$currentDate = date("Y-m-d H:i:s");

		try {

			$this->pdo->beginTransaction();

			foreach ($grievanceList as $g) {


				if(is_null($g["final_rating"])) $finalRating = 0;
				else $finalRating = $g["final_rating"];

				$statement = $this->pdo->prepare("UPDATE tbl_grievance_form 
														SET q_a_1 = ?, q_b_1 = ?, q_c_1 = ?, q_c_2 = ?, q_d_1 = ?,
															q_d_2 = ?, q_e_1 = ?, q_e_2 = ?, q_e_3 = ?, q_e_4 = ?,
															q_f_1 = ?, q_g_1 = ?, q_g_2 = ?, q_h_1 = ?, final_rating = ?, remarks = ?
														WHERE uuid = ?");

				$statement->execute([$g["q_a_1"],$g["q_b_1"],$g["q_c_1"],$g["q_c_2"],$g["q_d_1"],
										$g["q_d_2"],$g["q_e_1"],$g["q_e_2"],$g["q_e_3"],$g["q_e_4"],
										$g["q_f_1"],$g["q_g_1"],$g["q_g_2"],$g["q_h_1"],$finalRating,strtoupper($g["remarks"]),
										$g["uuid"]]);

			}

			$this->pdo->commit();
			$message = "SUCCESS";

		} catch (PDOExepction $e){

			$this->pdo->rollBack();
			$message = $e;

		}

		return $message;

	}

	public function saveComplaintDetails($generalInfo, $listOfSearchedNames, $userId, $barangayCode, $householdDetail, $rosterDetail){

		
		$currentDate = date("Y-m-d H:i:s");
		$synced = 'N'; 
		$archive = 0; // active
		$message = array();
		$complaintUuid = guidv4();
		$gId = uniqidReal($generalInfo['barangay']['value'],6);

		try {

			$this->pdo->beginTransaction();

			foreach ($listOfSearchedNames as $searchName) {

				$uuid = guidv4();

				$statement = $this->pdo->prepare("INSERT INTO searched_names
														(uuid, complaint_id, first_name, middle_name, last_name,
														 is_match, poor_status, hh_id, archive)
													VALUES (?,?,?,?,?,
																?,?,?,?)");

				$statement->execute([$uuid, $complaintUuid, trim($searchName['firstName']),trim($searchName['middleName']),
										trim($searchName['lastName']), (int)$searchName['isMatch'], (int)$searchName['poorStatus'], 
										$searchName['hhid'], $archive]);
			}

			if($generalInfo['typeOfComplaint']['value'] == "1"){


				$statement = $this->pdo->prepare("INSERT INTO tbl_grievance
														(uuid, g_id, first_name, middle_name, last_name, 
														ext_name, complaint_type, archive,
														complainant_region_code,
														complainant_province_code, complainant_city_code, complainant_barangay_code,
														last_modified, last_modified_by, is_sync)
													VALUES (?,?,?,?,?,
																?,?,?,
																?,?,?,?,
																?,?,?)");

				$statement->execute([$complaintUuid,$gId,strtoupper(trim($generalInfo['firstName']['value'])),
															strtoupper(trim($generalInfo['middleName']['value'])), strtoupper(trim($generalInfo['lastName']['value'])),
															strtoupper(trim($generalInfo['extName']['value'])), $generalInfo['typeOfComplaint']['value'], $archive, 
															$generalInfo['region']['value'], $generalInfo['province']['value'],
															$generalInfo['city']['value'],$generalInfo['barangay']['value'], 
															$currentDate, $userId,$synced]);

			} else {

					$statement = $this->pdo->prepare("INSERT INTO tbl_grievance
													(uuid, g_id,first_name, middle_name, last_name, ext_name,
													sex, birthdd, birthmm, birthyy, contact_number,
													email_address, id_presented, complaint_type, hh_id, complainant_region_code,
													complainant_province_code, complainant_city_code, complainant_barangay_code, purok_sitio, street_address,
													remarks, archive, last_modified, last_modified_by,is_sync)
												VALUES (?,?,?,?,?,?,
														?,?,?,?,?,
														?,?,?,?,?,
														?,?,?,?,?,
														?,?,?,?,?)");

					$statement->execute([$complaintUuid,$gId,strtoupper(trim($generalInfo['firstName']['value'])),strtoupper(trim($generalInfo['middleName']['value'])),strtoupper(trim($generalInfo['lastName']['value'])),strtoupper(trim($generalInfo['extName']['value'])),
									$generalInfo['sex']['value'],$generalInfo['dateOfBirthDD']['value'],$generalInfo['dateOfBirthMM']['value'],$generalInfo['dateOfBirthYYYY']['value'],$generalInfo['contactNumber']['value'],
									$generalInfo['emailAddress']['value'],$generalInfo['idPresented']['value'],$generalInfo['typeOfComplaint']['value'],$generalInfo['selectedHHID']['value'],$generalInfo['region']['value'],
									$generalInfo['province']['value'],$generalInfo['city']['value'],$generalInfo['barangay']['value'],
									strtoupper(trim($generalInfo['purokSitio']['value'])),strtoupper(trim($generalInfo['streetAddress']['value'])),
									strtoupper(trim($generalInfo['remarks']['value'])), $archive, $currentDate, $userId,$synced]);

					if($generalInfo['typeOfComplaint']['value'] == "2" || $generalInfo['typeOfComplaint']['value'] == "4"){
						$statement = $this->pdo->prepare("INSERT INTO tbl_grievance_form
													(uuid, g_id,first_name, middle_name, last_name, ext_name,
													complaint_type, hh_id, region_code,
													province_code, city_code, barangay_code,
													archive, last_modified, last_modified_by)
												VALUES (?,?,?,?,?,?,
														?,?,?,
														?,?,?,
														?,?,?)");

						$statement->execute([$complaintUuid,$gId,strtoupper(trim($generalInfo['firstName']['value'])),strtoupper(trim($generalInfo['middleName']['value'])),strtoupper(trim($generalInfo['lastName']['value'])),strtoupper(trim($generalInfo['extName']['value'])),
										$generalInfo['typeOfComplaint']['value'],$generalInfo['selectedHHID']['value'],$generalInfo['region']['value'],
										$generalInfo['province']['value'],$generalInfo['city']['value'],$generalInfo['barangay']['value'],
										$archive, $currentDate, $userId]);
					}

					if($generalInfo['typeOfComplaint']['value'] == "6" || $generalInfo['typeOfComplaint']['value'] == "7"){

						
						$statement = $this->pdo->prepare("INSERT INTO tbl_g_household
															(grievance_id, hh_id, region_code, province_code,
																city_code, barangay_code, purok_sitio, street_address, type_of_hh,
																respondent, last_modified, last_modified_by)

															VALUES 
															(?,?,?,?,
																?,?,?,?,?,
																?,?,?)");

						$statement->execute(saveHousehold($householdDetail, $complaintUuid, $currentDate, $userId));

						foreach ($rosterDetail as $roster) {

							if($roster['archive'] != 1){

								$statement = $this->pdo->prepare("INSERT INTO tbl_g_family_roster 
																	(grievance_id, uuid, hh_id, last_name,
																		first_name, middle_name, ext_name, birth_month, birth_day,
																		birth_year, birthdate, assessment_age, sex, is_pregnant,
																		marital_status, solo_parent, rel_hh, rel_fh, family_number,
																		diff_see, diff_hear, diff_walk, diff_rem, diff_care,
																		diff_com, is_attending_sch, hea, is_employed, occupation_enumerator,
																		occupation_area_supervisor, psoc, class_of_worker, basis_of_payment, ofi,
																		nature_of_employment, is_overseas, is_sending_money, how_often, last_modified,
																		last_modified_by, is_update)
																	VALUES
																	(?, ?, ?, AES_ENCRYPT(?, ?),
																		AES_ENCRYPT(?, ?), AES_ENCRYPT(?, ?), AES_ENCRYPT(?, ?), AES_ENCRYPT(?, ?), AES_ENCRYPT(?, ?),
																		AES_ENCRYPT(?, ?), AES_ENCRYPT(?, ?), ?, ?, ?,
																		?, ?, ?, ?, ?,
																		?, ?, ?, ?, ?,
																		?, ?, ?, ?, ?,
																		?, ?, ?, ?, ?,
																		?, ?, ?, ?, ?,
																		?, ?)");

								$statement->execute(saveRoster($roster, $complaintUuid, $householdDetail['hh_id'], $currentDate, $userId, $this->decryptor));

							}


						}

					}

			}

			$this->pdo->commit();
			$message["status"] = "SUCCESS";
			$message["message"] = $gId;

		} catch (PDOExepction $e){

			$this->pdo->rollBack();
			$message = $e;

		}

		return $message;


	}

	public function authenticateUser($username, $password){

		$status = 1; // active

		$statement = $this->pdo->prepare("SELECT s.user_type, s.first_name, s.mid_name, s.last_name, s.uid, s.region, r.region_name											FROM sys_staff s
												INNER JOIN lib_regions r
													ON r.region_code = s.region
											WHERE s.username = ? and s.password = MD5(?) and s.status = ?");

		$statement->execute([$username, $password, $status]);

		return $statement->fetchAll(PDO::FETCH_ASSOC);

	}

	public function resetUserPassword($data, $userId){

		
		$currentDate = date("Y-m-d H:i:s");

		$statement = $this->pdo->prepare("UPDATE users
											SET password = ?, last_modified = ?, last_modified_by = ?
											WHERE user_id = ?");

		$statement->execute([$this->defaulPassword,$currentDate,$userId,$data['userId']]);

		return $statement->rowCount();


	}


}

function uniqidReal($barangayPsgc,$lenght = 6) {
    // uniqid gives 13 chars, but you could adjust it to your needs.
    if (function_exists("random_bytes")) {
        $bytes = random_bytes(ceil($lenght / 2));
    } elseif (function_exists("openssl_random_pseudo_bytes")) {
        $bytes = openssl_random_pseudo_bytes(ceil($lenght / 2));
    } else {
        throw new Exception("no cryptographically secure random function available");
    }
    return $barangayPsgc."-1-".substr(bin2hex($bytes), 0, $lenght);
}

function guidv4($data = null)
{	
	$data = $data ?? random_bytes(16);
	
    assert(strlen($data) == 16);

    $data[6] = chr(ord($data[6]) & 0x0f | 0x40); // set version to 0100
    $data[8] = chr(ord($data[8]) & 0x3f | 0x80); // set bits 6-7 to 10

    return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
}

function saveRoster($roster, $complaintId, $householdId, $currentDate, $userId, $decryptor){

	$rosterArray = array();
	$uuid = $roster['archive'] === '3' ? guidv4() : $roster['id'];
	$hhid = $householdId;
	$lastName = trim($roster['lastName']['value']);
	$firstName = trim($roster['firstName']['value']) === '' ? null : trim($roster['firstName']['value']);
	$middleName = trim($roster['middleName']['value']) === '' ? null : trim($roster['middleName']['value']);
	$extName = $roster['extName']['value'] === '' ? null : $roster['extName']['value'];

	if($roster['birthdayAge']['birthdayCheckbox'] == 1) {
		$birthDay = $roster['birthdayAge']['birthDay']['value'];
		$birthMonth = $roster['birthdayAge']['birthMonth']['value'];
		$birthYear = $roster['birthdayAge']['birthYear']['value'];
		$birthdate = sprintf('%04d', $birthYear).sprintf('%02d', $birthMonth).sprintf('%02d', $birthDay);
	}
	else{

		$birthDay = null;
		$birthMonth = null;
		$birthYear = null;
		$birthdate = null;
	} 

	$age = $roster['birthdayAge']['age']['value'];

	$sex = $roster['sex']['value'];
	$pregnant = $roster['pregnant']['value'];
	$maritalStatus = $roster['maritalStatus']['value'];
	$soloParent = $roster['soloParent']['value'];
	$relHH = $roster['relHH']['value'];
	$relFH = $roster['relFH']['value'];
	$familyNumber = $roster['familyNumber']['value'];
	$attendingSchool = $roster['attendingSchool']['value'];
    $highestEducationAttained = $roster['highestEducationAttained']['value'];
    $seeing = $roster['seeing']['value'];
    $hearing = $roster['hearing']['value'];
    $walking = $roster['walking']['value'];
    $remembering = $roster['remembering']['value'];
    $caring = $roster['caring']['value'];
    $communicating = $roster['communicating']['value'];
    $employment = $roster['employment']['value'];
    $occupationEnumerator = $roster['occupationEnumerator']['value'] === '' ? null : trim($roster['occupationEnumerator']['value']);
    $occupationAreaSupervisor = $roster['occupationAreaSupervisor']['value'] === '' ? null : trim($roster['occupationAreaSupervisor']['value']);
    $psoc = $roster['psoc']['value'] === '' ? null : trim($roster['psoc']['value']);
    $classOfWorker = $roster['classOfWorker']['value'];
    $basisOfPayment = $roster['basisOfPayment']['value'];
    $natureOfEmployment = $roster['natureOfEmployment']['value'];
    $overseas = $roster['overseas']['value'];
    $ofi = $roster['ofi']['value'];
    $sendingMoney = $roster['sendingMoney']['value'];
    $howOften = $roster['howOften']['value'];
    $isUpdated = $roster['archive'] == '0' ? 'N' : 'Y';

	array_push($rosterArray, $complaintId, $uuid, $hhid, $lastName, $decryptor[2],
				$firstName, $decryptor[0], $middleName, $decryptor[1], $extName, $decryptor[7], $birthMonth, $decryptor[5], $birthDay, $decryptor[4],
				$birthYear, $decryptor[6], $birthdate, $decryptor[3], $age, $sex, $pregnant,
				$maritalStatus, $soloParent, $relHH, $relFH, $familyNumber,
				$seeing, $hearing, $walking, $remembering, $caring,
				$communicating, $attendingSchool, $highestEducationAttained, $employment, $occupationEnumerator,
				$occupationAreaSupervisor, $psoc, $classOfWorker, $basisOfPayment, $ofi,
				$natureOfEmployment, $overseas, $sendingMoney, $howOften, $currentDate, 
				$userId, $isUpdated);

	return $rosterArray;

}

function saveHousehold( $household, $complaintId, $currentDate, $userId){

	$householdArray = array();

	$hhid = $household['hh_id'];
	$regionCode = $household['region_code'];
	$provinceCode = $household['province_code'];
	$cityCode = $household['city_code'];
	$barangayCode = $household['barangay_code'];
	$purokSitio = trim($household['purok_sitio']);
	$streetAddress = trim($household['street_address']);
	$typeOfHh = $household['type_of_hh'];
	$respondent = $household['respondent'];

	array_push($householdArray, $complaintId, $hhid, $regionCode, $provinceCode,
					$cityCode, $barangayCode, $purokSitio, $streetAddress, $typeOfHh,
					$respondent, $currentDate, $userId);

	return $householdArray;

}