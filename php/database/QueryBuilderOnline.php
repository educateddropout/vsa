<?php

class QueryBuilderOnline

{

	protected $pdo;

	public function __construct($pdo)

	{

		$this->pdo = $pdo;

	}

	public function syncGrievances($data){

		$complaint = $data[0][0];
		$searches = $data[1];
		$message = "";

		try {

			$this->pdo->beginTransaction();

			$statement = $this->pdo->prepare("INSERT INTO tbl_grievance
														(uuid, first_name, middle_name, last_name, ext_name,
														sex, birthdd, birthmm, birthyy, contact_number,
														email_address, id_presented, complaint_type, hh_id, complainant_region_code,
														complainant_province_code, complainant_city_code, complainant_barangay_code, purok_sitio, street_address,
														remarks,area_barangay_code ,archive, last_modified, last_modified_by,is_sync)
													VALUES (?,?,?,?,?,
															?,?,?,?,?,
															?,?,?,?,?,
															?,?,?,?,?,
															?,?,?,?,?,?)");

			$statement->execute([$complaint['uuid'],$complaint['first_name'],$complaint['middle_name'],$complaint['last_name'],$complaint['ext_name'],
									$complaint['sex'],$complaint['birthdd'],$complaint['birthmm'],$complaint['birthyy'],$complaint['contact_number'],
									$complaint['email_address'],$complaint['id_presented'],$complaint['complaint_type'],$complaint['hh_id'],$complaint['complainant_region_code'],
									$complaint['complainant_province_code'],$complaint['complainant_city_code'],$complaint['complainant_barangay_code'],$complaint['purok_sitio'],$complaint['street_address'],
									$complaint['remarks'],$complaint['area_barangay_code'],$complaint['archive'],$complaint['last_modified'],$complaint['last_modified_by'],$complaint['is_sync'] ]);

			foreach ($searches as $search) {

				$statement = $this->pdo->prepare("INSERT INTO searched_names
														(uuid, complaint_id, first_name, middle_name, last_name,
														 is_match, poor_status, hh_id, archive)
													VALUES (?,?,?,?,?,
																?,?,?,?)");

				$statement->execute([$search['uuid'],$search['complaint_id'],$search['first_name'],$search['middle_name'],$search['last_name'],
										$search['is_match'],$search['poor_status'],$search['hh_id'],$search['archive'] ]);
			}


			/*if(count($data) > 2){

				$hhUpdates = $data[2][0];

				if($complaint['complaint_type'] == 8){
					$statement = $this->pdo->prepare("UPDATE tbl_household_caraga 
														SET region_code = ?, province_code = ?, city_code = ?, 
														barangay_code = ?, purok_sitio = ? , street_address = ? 
														WHERE hh_id = ?");

					$statement->execute([$hhUpdates['region_code'], $hhUpdates['province_code'], $hhUpdates['city_code'],
											$hhUpdates['barangay_code'], $hhUpdates['purok_sitio'], $hhUpdates['street_address'],
											$hhUpdates['hh_id']]);
				}

			}*/

			$this->pdo->commit();
			$message = "SUCCESS";

		} catch (PDOExepction $e){

			$this->pdo->rollBack();
			$message = $e;

		}

		return $message;
		
	}


}
