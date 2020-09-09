<?php
	

	// setting return value
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");

	// decoding of post data //
	$data = json_decode(file_get_contents("php://input"), true);

	$returnJson = array();
	$returnJson["status"] = "SUCCESS";

	

	$dir = "../pdf/grievance_evaluation_form.pdf";
	$returnJson["message"] = $dir;
	//print_r($gList);
	printPdf($dir, $data);

	print_r(json_encode($returnJson));


	function printPdf($dir, $data){

		$results = $data['g_list'];
		$gType = $data['g_type'];
		$regionName = $data['regionName'];
		$provinceName = $data['provinceName'];
		$cityName = $data['cityName'];
		$barangayName = $data['barangayName'];

		require("../lib/fpdf/fpdf.php");

		$f = new NumberFormatter("en", NumberFormatter::SPELLOUT);

		class PDF extends FPDF
		{

			public $T128;                                         // Tableau des codes 128
			public $ABCset = "";                                  // jeu des caractÃ¨res Ã©ligibles au C128
			public $Aset = "";                                    // Set A du jeu des caractÃ¨res Ã©ligibles
			public $Bset = "";                                    // Set B du jeu des caractÃ¨res Ã©ligibles
			public $Cset = "";                                    // Set C du jeu des caractÃ¨res Ã©ligibles
			public $SetFrom;                                      // Convertisseur source des jeux vers le tableau
			public $SetTo;                                        // Convertisseur destination des jeux vers le tableau
			public $JStart = array("A"=>103, "B"=>104, "C"=>105); // CaractÃ¨res de sÃ©lection de jeu au dÃ©but du C128
			public $JSwap = array("A"=>101, "B"=>100, "C"=>99);   // CaractÃ¨res de changement de jeu

			//____________________________ Extension du constructeur _______________________
			function __construct($orientation='P', $unit='mm', $format='A4') {

			    parent::__construct($orientation,$unit,$format);

			    $this->T128[] = array(2, 1, 2, 2, 2, 2);           //0 : [ ]               // composition des caractÃ¨res
			    $this->T128[] = array(2, 2, 2, 1, 2, 2);           //1 : [!]
			    $this->T128[] = array(2, 2, 2, 2, 2, 1);           //2 : ["]
			    $this->T128[] = array(1, 2, 1, 2, 2, 3);           //3 : [#]
			    $this->T128[] = array(1, 2, 1, 3, 2, 2);           //4 : [$]
			    $this->T128[] = array(1, 3, 1, 2, 2, 2);           //5 : [%]
			    $this->T128[] = array(1, 2, 2, 2, 1, 3);           //6 : [&]
			    $this->T128[] = array(1, 2, 2, 3, 1, 2);           //7 : [']
			    $this->T128[] = array(1, 3, 2, 2, 1, 2);           //8 : [(]
			    $this->T128[] = array(2, 2, 1, 2, 1, 3);           //9 : [)]
			    $this->T128[] = array(2, 2, 1, 3, 1, 2);           //10 : [*]
			    $this->T128[] = array(2, 3, 1, 2, 1, 2);           //11 : [+]
			    $this->T128[] = array(1, 1, 2, 2, 3, 2);           //12 : [,]
			    $this->T128[] = array(1, 2, 2, 1, 3, 2);           //13 : [-]
			    $this->T128[] = array(1, 2, 2, 2, 3, 1);           //14 : [.]
			    $this->T128[] = array(1, 1, 3, 2, 2, 2);           //15 : [/]
			    $this->T128[] = array(1, 2, 3, 1, 2, 2);           //16 : [0]
			    $this->T128[] = array(1, 2, 3, 2, 2, 1);           //17 : [1]
			    $this->T128[] = array(2, 2, 3, 2, 1, 1);           //18 : [2]
			    $this->T128[] = array(2, 2, 1, 1, 3, 2);           //19 : [3]
			    $this->T128[] = array(2, 2, 1, 2, 3, 1);           //20 : [4]
			    $this->T128[] = array(2, 1, 3, 2, 1, 2);           //21 : [5]
			    $this->T128[] = array(2, 2, 3, 1, 1, 2);           //22 : [6]
			    $this->T128[] = array(3, 1, 2, 1, 3, 1);           //23 : [7]
			    $this->T128[] = array(3, 1, 1, 2, 2, 2);           //24 : [8]
			    $this->T128[] = array(3, 2, 1, 1, 2, 2);           //25 : [9]
			    $this->T128[] = array(3, 2, 1, 2, 2, 1);           //26 : [:]
			    $this->T128[] = array(3, 1, 2, 2, 1, 2);           //27 : [;]
			    $this->T128[] = array(3, 2, 2, 1, 1, 2);           //28 : [<]
			    $this->T128[] = array(3, 2, 2, 2, 1, 1);           //29 : [=]
			    $this->T128[] = array(2, 1, 2, 1, 2, 3);           //30 : [>]
			    $this->T128[] = array(2, 1, 2, 3, 2, 1);           //31 : [?]
			    $this->T128[] = array(2, 3, 2, 1, 2, 1);           //32 : [@]
			    $this->T128[] = array(1, 1, 1, 3, 2, 3);           //33 : [A]
			    $this->T128[] = array(1, 3, 1, 1, 2, 3);           //34 : [B]
			    $this->T128[] = array(1, 3, 1, 3, 2, 1);           //35 : [C]
			    $this->T128[] = array(1, 1, 2, 3, 1, 3);           //36 : [D]
			    $this->T128[] = array(1, 3, 2, 1, 1, 3);           //37 : [E]
			    $this->T128[] = array(1, 3, 2, 3, 1, 1);           //38 : [F]
			    $this->T128[] = array(2, 1, 1, 3, 1, 3);           //39 : [G]
			    $this->T128[] = array(2, 3, 1, 1, 1, 3);           //40 : [H]
			    $this->T128[] = array(2, 3, 1, 3, 1, 1);           //41 : [I]
			    $this->T128[] = array(1, 1, 2, 1, 3, 3);           //42 : [J]
			    $this->T128[] = array(1, 1, 2, 3, 3, 1);           //43 : [K]
			    $this->T128[] = array(1, 3, 2, 1, 3, 1);           //44 : [L]
			    $this->T128[] = array(1, 1, 3, 1, 2, 3);           //45 : [M]
			    $this->T128[] = array(1, 1, 3, 3, 2, 1);           //46 : [N]
			    $this->T128[] = array(1, 3, 3, 1, 2, 1);           //47 : [O]
			    $this->T128[] = array(3, 1, 3, 1, 2, 1);           //48 : [P]
			    $this->T128[] = array(2, 1, 1, 3, 3, 1);           //49 : [Q]
			    $this->T128[] = array(2, 3, 1, 1, 3, 1);           //50 : [R]
			    $this->T128[] = array(2, 1, 3, 1, 1, 3);           //51 : [S]
			    $this->T128[] = array(2, 1, 3, 3, 1, 1);           //52 : [T]
			    $this->T128[] = array(2, 1, 3, 1, 3, 1);           //53 : [U]
			    $this->T128[] = array(3, 1, 1, 1, 2, 3);           //54 : [V]
			    $this->T128[] = array(3, 1, 1, 3, 2, 1);           //55 : [W]
			    $this->T128[] = array(3, 3, 1, 1, 2, 1);           //56 : [X]
			    $this->T128[] = array(3, 1, 2, 1, 1, 3);           //57 : [Y]
			    $this->T128[] = array(3, 1, 2, 3, 1, 1);           //58 : [Z]
			    $this->T128[] = array(3, 3, 2, 1, 1, 1);           //59 : [[]
			    $this->T128[] = array(3, 1, 4, 1, 1, 1);           //60 : [\]
			    $this->T128[] = array(2, 2, 1, 4, 1, 1);           //61 : []]
			    $this->T128[] = array(4, 3, 1, 1, 1, 1);           //62 : [^]
			    $this->T128[] = array(1, 1, 1, 2, 2, 4);           //63 : [_]
			    $this->T128[] = array(1, 1, 1, 4, 2, 2);           //64 : [`]
			    $this->T128[] = array(1, 2, 1, 1, 2, 4);           //65 : [a]
			    $this->T128[] = array(1, 2, 1, 4, 2, 1);           //66 : [b]
			    $this->T128[] = array(1, 4, 1, 1, 2, 2);           //67 : [c]
			    $this->T128[] = array(1, 4, 1, 2, 2, 1);           //68 : [d]
			    $this->T128[] = array(1, 1, 2, 2, 1, 4);           //69 : [e]
			    $this->T128[] = array(1, 1, 2, 4, 1, 2);           //70 : [f]
			    $this->T128[] = array(1, 2, 2, 1, 1, 4);           //71 : [g]
			    $this->T128[] = array(1, 2, 2, 4, 1, 1);           //72 : [h]
			    $this->T128[] = array(1, 4, 2, 1, 1, 2);           //73 : [i]
			    $this->T128[] = array(1, 4, 2, 2, 1, 1);           //74 : [j]
			    $this->T128[] = array(2, 4, 1, 2, 1, 1);           //75 : [k]
			    $this->T128[] = array(2, 2, 1, 1, 1, 4);           //76 : [l]
			    $this->T128[] = array(4, 1, 3, 1, 1, 1);           //77 : [m]
			    $this->T128[] = array(2, 4, 1, 1, 1, 2);           //78 : [n]
			    $this->T128[] = array(1, 3, 4, 1, 1, 1);           //79 : [o]
			    $this->T128[] = array(1, 1, 1, 2, 4, 2);           //80 : [p]
			    $this->T128[] = array(1, 2, 1, 1, 4, 2);           //81 : [q]
			    $this->T128[] = array(1, 2, 1, 2, 4, 1);           //82 : [r]
			    $this->T128[] = array(1, 1, 4, 2, 1, 2);           //83 : [s]
			    $this->T128[] = array(1, 2, 4, 1, 1, 2);           //84 : [t]
			    $this->T128[] = array(1, 2, 4, 2, 1, 1);           //85 : [u]
			    $this->T128[] = array(4, 1, 1, 2, 1, 2);           //86 : [v]
			    $this->T128[] = array(4, 2, 1, 1, 1, 2);           //87 : [w]
			    $this->T128[] = array(4, 2, 1, 2, 1, 1);           //88 : [x]
			    $this->T128[] = array(2, 1, 2, 1, 4, 1);           //89 : [y]
			    $this->T128[] = array(2, 1, 4, 1, 2, 1);           //90 : [z]
			    $this->T128[] = array(4, 1, 2, 1, 2, 1);           //91 : [{]
			    $this->T128[] = array(1, 1, 1, 1, 4, 3);           //92 : [|]
			    $this->T128[] = array(1, 1, 1, 3, 4, 1);           //93 : [}]
			    $this->T128[] = array(1, 3, 1, 1, 4, 1);           //94 : [~]
			    $this->T128[] = array(1, 1, 4, 1, 1, 3);           //95 : [DEL]
			    $this->T128[] = array(1, 1, 4, 3, 1, 1);           //96 : [FNC3]
			    $this->T128[] = array(4, 1, 1, 1, 1, 3);           //97 : [FNC2]
			    $this->T128[] = array(4, 1, 1, 3, 1, 1);           //98 : [SHIFT]
			    $this->T128[] = array(1, 1, 3, 1, 4, 1);           //99 : [Cswap]
			    $this->T128[] = array(1, 1, 4, 1, 3, 1);           //100 : [Bswap]                
			    $this->T128[] = array(3, 1, 1, 1, 4, 1);           //101 : [Aswap]
			    $this->T128[] = array(4, 1, 1, 1, 3, 1);           //102 : [FNC1]
			    $this->T128[] = array(2, 1, 1, 4, 1, 2);           //103 : [Astart]
			    $this->T128[] = array(2, 1, 1, 2, 1, 4);           //104 : [Bstart]
			    $this->T128[] = array(2, 1, 1, 2, 3, 2);           //105 : [Cstart]
			    $this->T128[] = array(2, 3, 3, 1, 1, 1);           //106 : [STOP]
			    $this->T128[] = array(2, 1);                       //107 : [END BAR]

			    for ($i = 32; $i <= 95; $i++) {                                            // jeux de caractÃ¨res
			        $this->ABCset .= chr($i);
			    }
			    $this->Aset = $this->ABCset;
			    $this->Bset = $this->ABCset;
			    
			    for ($i = 0; $i <= 31; $i++) {
			        $this->ABCset .= chr($i);
			        $this->Aset .= chr($i);
			    }
			    for ($i = 96; $i <= 127; $i++) {
			        $this->ABCset .= chr($i);
			        $this->Bset .= chr($i);
			    }
			    for ($i = 200; $i <= 210; $i++) {                                           // controle 128
			        $this->ABCset .= chr($i);
			        $this->Aset .= chr($i);
			        $this->Bset .= chr($i);
			    }
			    $this->Cset="0123456789".chr(206);

			    for ($i=0; $i<96; $i++) {                                                   // convertisseurs des jeux A & B
			        @$this->SetFrom["A"] .= chr($i);
			        @$this->SetFrom["B"] .= chr($i + 32);
			        @$this->SetTo["A"] .= chr(($i < 32) ? $i+64 : $i-32);
			        @$this->SetTo["B"] .= chr($i);
			    }
			    for ($i=96; $i<107; $i++) {                                                 // contrÃ´le des jeux A & B
			        @$this->SetFrom["A"] .= chr($i + 104);
			        @$this->SetFrom["B"] .= chr($i + 104);
			        @$this->SetTo["A"] .= chr($i);
			        @$this->SetTo["B"] .= chr($i);
			    }
			}

			//________________ Fonction encodage et dessin du code 128 _____________________
			function Code128($x, $y, $code, $w, $h) {
			    $Aguid = "";                                                                      // CrÃ©ation des guides de choix ABC
			    $Bguid = "";
			    $Cguid = "";
			    for ($i=0; $i < strlen($code); $i++) {
			        $needle = substr($code,$i,1);
			        $Aguid .= ((strpos($this->Aset,$needle)===false) ? "N" : "O"); 
			        $Bguid .= ((strpos($this->Bset,$needle)===false) ? "N" : "O"); 
			        $Cguid .= ((strpos($this->Cset,$needle)===false) ? "N" : "O");
			    }

			    $SminiC = "OOOO";
			    $IminiC = 4;

			    $crypt = "";
			    while ($code > "") {
			                                                                                    // BOUCLE PRINCIPALE DE CODAGE
			        $i = strpos($Cguid,$SminiC);                                                // forÃ§age du jeu C, si possible
			        if ($i!==false) {
			            $Aguid [$i] = "N";
			            $Bguid [$i] = "N";
			        }

			        if (substr($Cguid,0,$IminiC) == $SminiC) {                                  // jeu C
			            $crypt .= chr(($crypt > "") ? $this->JSwap["C"] : $this->JStart["C"]);  // dÃ©but Cstart, sinon Cswap
			            $made = strpos($Cguid,"N");                                             // Ã©tendu du set C
			            if ($made === false) {
			                $made = strlen($Cguid);
			            }
			            if (fmod($made,2)==1) {
			                $made--;                                                            // seulement un nombre pair
			            }
			            for ($i=0; $i < $made; $i += 2) {
			                $crypt .= chr(strval(substr($code,$i,2)));                          // conversion 2 par 2
			            }
			            $jeu = "C";
			        } else {
			            $madeA = strpos($Aguid,"N");                                            // Ã©tendu du set A
			            if ($madeA === false) {
			                $madeA = strlen($Aguid);
			            }
			            $madeB = strpos($Bguid,"N");                                            // Ã©tendu du set B
			            if ($madeB === false) {
			                $madeB = strlen($Bguid);
			            }
			            $made = (($madeA < $madeB) ? $madeB : $madeA );                         // Ã©tendu traitÃ©e
			            $jeu = (($madeA < $madeB) ? "B" : "A" );                                // Jeu en cours

			            $crypt .= chr(($crypt > "") ? $this->JSwap[$jeu] : $this->JStart[$jeu]); // dÃ©but start, sinon swap

			            $crypt .= strtr(substr($code, 0,$made), $this->SetFrom[$jeu], $this->SetTo[$jeu]); // conversion selon jeu

			        }
			        $code = substr($code,$made);                                           // raccourcir lÃ©gende et guides de la zone traitÃ©e
			        $Aguid = substr($Aguid,$made);
			        $Bguid = substr($Bguid,$made);
			        $Cguid = substr($Cguid,$made);
			    }                                                                          // FIN BOUCLE PRINCIPALE

			    $check = ord($crypt[0]);                                                   // calcul de la somme de contrÃ´le
			    for ($i=0; $i<strlen($crypt); $i++) {
			        $check += (ord($crypt[$i]) * $i);
			    }
			    $check %= 103;

			    $crypt .= chr($check) . chr(106) . chr(107);                               // Chaine cryptÃ©e complÃ¨te

			    $i = (strlen($crypt) * 11) - 8;                                            // calcul de la largeur du module
			    $modul = $w/$i;

			    for ($i=0; $i<strlen($crypt); $i++) {                                      // BOUCLE D'IMPRESSION
			        $c = $this->T128[ord($crypt[$i])];
			        for ($j=0; $j<count($c); $j++) {
			            $this->Rect($x,$y,$c[$j]*$modul,$h,"F");
			            $x += ($c[$j++]+$c[$j])*$modul;
			        }
			    }
			}

			function SetDash($black=null, $white=null)
		    {
		        if($black!==null)
		            $s=sprintf('[%.3F %.3F] 0 d',$black*$this->k,$white*$this->k);
		        else
		            $s='[] 0 d';
		        $this->_out($s);
		    }

		    function Cell($w, $h=0, $txt='', $border=0, $ln=0, $align='', $fill=false, $link='')
			{
				parent::Cell($w, $h, $this->normalize($txt), $border, $ln, $align, $fill, $link);
			}

			protected function normalize($word)
			{
				
				
				$word = str_replace("Ãƒâ€˜","%D1",$word);
				$word = str_replace("ÃƒÂ±","%F1",$word);
				$word = str_replace("Ã±","%F1",$word);
				$word = str_replace("Ã‘","%D1",$word);

				return urldecode($word);
			}
			

			//Cell with horizontal scaling if text is too wide
		    function CellFit($w, $h=0, $txt='', $border=0, $ln=0, $align='', $fill=false, $link='', $scale=false, $force=true)
		    {
		        //Get string width
		        $str_width=$this->GetStringWidth($txt);

		        //Calculate ratio to fit cell
		        if($w==0)
		            $w = $this->w-$this->rMargin-$this->x;

		        if($str_width == 0) $str_width = 1;
		        $ratio = ($w-$this->cMargin*2)/$str_width;

		        $fit = ($ratio < 1 || ($ratio > 1 && $force));
		        if ($fit)
		        {
		            if ($scale)
		            {
		                //Calculate horizontal scaling
		                $horiz_scale=$ratio*100.0;
		                //Set horizontal scaling
		                $this->_out(sprintf('BT %.2F Tz ET',$horiz_scale));
		            }
		            else
		            {
		                //Calculate character spacing in points
		                $char_space=($w-$this->cMargin*2-$str_width)/max($this->MBGetStringLength($txt)-1,1)*$this->k;
		                //Set character spacing
		                $this->_out(sprintf('BT %.2F Tc ET',$char_space));
		            }
		            //Override user alignment (since text will fill up cell)
		            $align='';
		        }

		        //Pass on to Cell method
		        $this->Cell($w,$h,$txt,$border,$ln,$align,$fill,$link);

		        //Reset character spacing/horizontal scaling
		        if ($fit)
		            $this->_out('BT '.($scale ? '100 Tz' : '0 Tc').' ET');
		    }

		    //Cell with horizontal scaling only if necessary
		    function CellFitScale($w, $h=0, $txt='', $border=0, $ln=0, $align='', $fill=false, $link='')
		    {
		        $this->CellFit($w,$h,$txt,$border,$ln,$align,$fill,$link,true,false);
		    }

		    
			function Header()
			{
			    
			    $listhananLogo = "../assets/listahanan.jpg";
			    $dswdLogo = "../assets/dswd.jpg";
			    
			    // Logo
			    $imageHeight = 15.7;
			    $startOfX = 10;
			    $startOfY = 7;
			    $this->Image($dswdLogo,$startOfX,$startOfY,44,$imageHeight);
			    $this->Image($listhananLogo,237,$startOfY,50,$imageHeight);

			    $this->SetY($startOfY);
			    $this->SetX(278);
			    $this->SetFont('Arial','',9);
			    $this->Cell(7,5,'Form 2',0,0,'C');

			    // Arial bold 15
			    $this->SetFont('Arial','B',14);
			    // Move to the right
			    // Title
			    $this->SetY($startOfY + $imageHeight + 1);
			    $this->Cell(277,10,'GRIEVANCE EVALUATION FORM',0,0,'C');
			    $this->SetY($startOfY + $imageHeight + 1);

				$this->SetY($startOfY + $imageHeight + 6 );
			    $this->SetFont('Arial','',11);

			    $this->Cell(277,10,$this->gType,0,0,'C', false);
			}

			// Page footer
			function Footer()
			{
				// Position at 1.5 cm from bottom
			    $this->SetY(-15);
			    // Arial italic 8
			    $this->SetFont('Arial','I',8);
			    // Page number
			    $this->Cell(0,10,'Page '.$this->PageNo().' of {nb}',0,0,'C');
			}

		}

		// Instanciation of inherited class
		//$pdf = new PDF("P", "mm", array(330.2 ,215.9 ));
		$pdf = new PDF("L", "mm", array(210 ,297 ));
		$pdf->AliasNbPages();
		$pdf->SetFont('Times','',10);
		$pdf->gType = $gType;

		$pdf->AddPage();
		$rowCtr = 1;
		$startOfY = 40;
		$startOfX = 10;

		$yAxis = $startOfY;
		$xAxis = $startOfX;

	    $firstHeaderHeight = 30.5;
	    $firstHeaderHeight2 = 8;
	    $secondHeaderHeight = 22.5;
	    $secondHeaderHeight2 = 15;
	    $thirdHeaderHeight = 7.5;
	    $col1 = 40;
	    $col2 = 67;
	    $col3 = 10;
	    $col4 = 8.5;
	    $col5 = 15;
	    $col6 = 30; 

	    $pdf->SetY($yAxis);
	    $pdf->SetX($xAxis);
	    $pdf->SetFont('Arial','',8);
	    $pdf->CellFitScale(277,4, "Instruction : Put a check mark in the column if it satisfies the criteria in the rating guide",1,0,'L',false);
	    $pdf->SetFillColor(240, 248, 255);
	    $yAxis += 4;
	    $pdf->SetY($yAxis);
	    $pdf->SetX($xAxis);
	    $pdf->SetFont('Arial','B',8);
	    $pdf->CellFitScale($col1,$firstHeaderHeight, "Tracking No.",1,0,'C',true);
	    $pdf->CellFitScale($col2,$firstHeaderHeight, "Name of  Complainant",1,0,'C',true);
	    $pdf->CellFitScale(125,$firstHeaderHeight2, "Components/Indicators",1,0,'C',true);
	    $pdf->CellFitScale($col5,$firstHeaderHeight, "Final Rating",1,0,'C',true);
	    $pdf->CellFitScale($col6,$firstHeaderHeight, "Remarks",1,0,'C',true);

	    $yAxis += $firstHeaderHeight2;
	    $xAxis += $col1 + $col2;
	    $pdf->SetY($yAxis);
	    $pdf->SetX($xAxis);
	    $pdf->CellFitScale($col3,$secondHeaderHeight, "A. Employable Skills",1,0,'C',true);
	    $pdf->CellFitScale($col3,$secondHeaderHeight, "B. Financial Security",1,0,'C',true);
	    $pdf->CellFitScale(17,$secondHeaderHeight2, "C. Health",1,0,'C',true);
	    $pdf->CellFitScale(17,$secondHeaderHeight2, "D. Water & Sanitation",1,0,'C',true);
	    $pdf->CellFitScale(34,$secondHeaderHeight2, "E. Housing",1,0,'C',true);
	    $pdf->CellFitScale($col3,$secondHeaderHeight2, "F. Lighting Facility",1,0,'C',true);
	    $pdf->CellFitScale(17,$secondHeaderHeight2, "G. Education",1,0,'C',true);
	    $pdf->CellFitScale($col3,$secondHeaderHeight, "H. Location",1,0,'C',true);

	    $yAxis += $secondHeaderHeight2;
	    $xAxis += $col3+$col3;
	    $pdf->SetY($yAxis);
	    $pdf->SetX($xAxis);
	    $pdf->CellFitScale($col4,$thirdHeaderHeight, "I",1,0,'C',true);
	    $pdf->CellFitScale($col4,$thirdHeaderHeight, "II",1,0,'C',true);
	    $pdf->CellFitScale($col4,$thirdHeaderHeight, "I",1,0,'C',true);
	    $pdf->CellFitScale($col4,$thirdHeaderHeight, "II",1,0,'C',true);
	    $pdf->CellFitScale($col4,$thirdHeaderHeight, "I.1",1,0,'C',true);
	    $pdf->CellFitScale($col4,$thirdHeaderHeight, "I.1",1,0,'C',true);
	    $pdf->CellFitScale($col4,$thirdHeaderHeight, "II.1",1,0,'C',true);
	    $pdf->CellFitScale($col4,$thirdHeaderHeight, "II.2",1,0,'C',true);
	    $pdf->CellFitScale($col3,$thirdHeaderHeight, "II.2",1,0,'C',true);
	    $pdf->CellFitScale($col4,$thirdHeaderHeight, "I",1,0,'C',true);
	    $pdf->CellFitScale($col4,$thirdHeaderHeight, "II",1,0,'C',true);
	    $pdf->SetFont('Arial','',9);

	    $rowHeight = 7.5;
		$rowCntPerPage = 0;
		$pointsHeight = 3;

		foreach ($results as $r) {

			$rowCntPerPage++;

			if(fmod($rowCntPerPage, 2) == 0) $pdf->SetFillColor(255, 255, 255);
			else $pdf->SetFillColor(245, 245, 245);

			$yAxis += $rowHeight;
			$pdf->SetY($yAxis);
			$pdf->SetX($startOfX);

			$pdf->CellFitScale($col1-33,$rowHeight, $rowCtr,1,0,"L",false);
			$pdf->CellFitScale($col1-7,$rowHeight, $r['g_id'],1,0,"C",false);
			$pdf->CellFitScale($col2,$rowHeight, " ".$r['last_name'].", ".$r['first_name']." ".$r['middle_name']." ".$r['ext_name'],1,0,"L",false);
			$pdf->CellFitScale($col3,$rowHeight, "",1,0,"L",false);
			$pdf->CellFitScale($col3,$rowHeight, "",1,0,"L",false);
			$pdf->CellFitScale($col4,$rowHeight, "",1,0,"L",false);
			$pdf->CellFitScale($col4,$rowHeight, "",1,0,"L",false);
			$pdf->CellFitScale($col4,$rowHeight, "",1,0,"L",false);
			$pdf->CellFitScale($col4,$rowHeight, "",1,0,"L",false);
			$pdf->CellFitScale($col4,$rowHeight, "",1,0,"L",false);
			$pdf->CellFitScale($col4,$rowHeight, "",1,0,"L",false);
			$pdf->CellFitScale($col4,$rowHeight, "",1,0,"L",false);
			$pdf->CellFitScale($col4,$rowHeight, "",1,0,"L",false);
			$pdf->CellFitScale($col3,$rowHeight, "",1,0,"L",false);
			$pdf->CellFitScale($col4,$rowHeight, "",1,0,"L",false);
			$pdf->CellFitScale($col4,$rowHeight, "",1,0,"L",false);
			$pdf->CellFitScale($col3,$rowHeight, "",1,0,"L",false);
			$pdf->CellFitScale($col5,$rowHeight, "",1,0,"L",false);
			$pdf->CellFitScale($col6,$rowHeight, "",1,0,"L",false);

			if(fmod($rowCtr, 10) == 0){

				//footer
				$yAxis += $rowHeight;
				$pdf->SetY($yAxis);
				$pdf->SetX($startOfX);
				$pdf->SetFont('Arial','',5);

				$pdf->CellFitScale($col1+$col2,$pointsHeight, "Points",1,0,"L",false);
				$pdf->CellFitScale($col3,$pointsHeight, "10",1,0,"C",false);
				$pdf->CellFitScale($col3,$pointsHeight, "5",1,0,"C",false);
				$pdf->CellFitScale($col4,$pointsHeight, "10",1,0,"C",false);
				$pdf->CellFitScale($col4,$pointsHeight, "10",1,0,"C",false);
				$pdf->CellFitScale($col4,$pointsHeight, "5",1,0,"C",false);
				$pdf->CellFitScale($col4,$pointsHeight, "5",1,0,"C",false);
				$pdf->CellFitScale($col4,$pointsHeight, "5",1,0,"C",false);
				$pdf->CellFitScale($col4,$pointsHeight, "5",1,0,"C",false);
				$pdf->CellFitScale($col4,$pointsHeight, "5",1,0,"C",false);
				$pdf->CellFitScale($col4,$pointsHeight, "5",1,0,"C",false);
				$pdf->CellFitScale($col3,$pointsHeight, "10",1,0,"C",false);
				$pdf->CellFitScale($col4,$pointsHeight, "10",1,0,"C",false);
				$pdf->CellFitScale($col4,$pointsHeight, "10",1,0,"C",false);
				$pdf->CellFitScale($col3,$pointsHeight, "5",1,0,"C",false);
				$pdf->CellFitScale($col5,$pointsHeight, "100",1,0,"C",false);
				$pdf->CellFitScale($col6,$pointsHeight, "",1,0,"C",false);

				$yAxis += $pointsHeight;
				$pdf->SetY($yAxis);
				$pdf->SetX($startOfX);
				$startOfBottomY = $yAxis;
				

				$pdf->CellFitScale($col1+$col2+$col3+$col3,37, "",1,0,"C",false);
				$pdf->CellFitScale($col4+$col4+$col4+$col4+$col4+$col4+$col4+$col4+$col3+$col4+$col4+$col3+$col5+$col6,37, "",1,0,"C",false);

				$yAxis += 1;
				$pdf->SetY($yAxis);
				$pdf->SetX($startOfX+3);
				$pdf->SetFont('Arial','B',10);
				$pdf->CellFitScale($col1-5,5, "Geographic Information:",0,0,"L",false);
				$pdf->SetFont('Arial','',10);

				$yAxis += 8;
				$pdf->SetY($yAxis);
				$pdf->SetX($startOfX+3);
				$pdf->CellFitScale($col1-5,5, "Region",0,0,"L",false);
				$pdf->CellFitScale(5,5, ":",0,0,"L",false);
				$pdf->CellFitScale(55,5, "","B",0,"L",false);

				$yAxis += 6;
				$pdf->SetY($yAxis);
				$pdf->SetX($startOfX+3);
				$pdf->CellFitScale($col1-5,5, "Province",0,0,"L",false);
				$pdf->CellFitScale(5,5, ":",0,0,"L",false);
				$pdf->CellFitScale(55,5, "","B",0,"L",false);

				$yAxis += 6;
				$pdf->SetY($yAxis);
				$pdf->SetX($startOfX+3);
				$pdf->CellFitScale($col1-5,5, "City/Municipality",0,0,"L",false);
				$pdf->CellFitScale(5,5, ":",0,0,"L",false);
				$pdf->CellFitScale(55,5, "","B",0,"L",false);

				$yAxis += 6;
				$pdf->SetY($yAxis);
				$pdf->SetX($startOfX+3);
				$pdf->CellFitScale($col1-5,5, "Barangay",0,0,"L",false);
				$pdf->CellFitScale(5,5, ":",0,0,"L",false);
				$pdf->CellFitScale(55,5, "","B",0,"L",false);

				// right box
				$rigthBoxStartX= $startOfX+3+$col1+$col2+$col3+$col3;
				$yAxis = $startOfBottomY+1;
				$pdf->SetY($yAxis);
				$pdf->SetX($rigthBoxStartX);
				$pdf->SetFont('Arial','B',10);
				$pdf->CellFitScale(25,5, "Certification:",0,0,"L",false);
				$pdf->SetFont('Arial','',10);
				$pdf->CellFitScale(100,5, "I hereby certify that the date set forth were reviewed by me",0,0,"L",false);

				$yAxis += 4;
				$pdf->SetY($yAxis);
				$pdf->SetX($rigthBoxStartX);
				$pdf->CellFitScale(125,5, "personally and in accordance with the guidelines provided.",0,0,"L",false);

				$yAxis += 20;
				$pdf->SetY($yAxis);
				$pdf->SetX($rigthBoxStartX);
				$pdf->SetFont('Arial','',9);
				$pdf->CellFitScale(65,5, "Signature over printed name of the BVT Chairperson","T",0,"L",false);
				$pdf->CellFitScale(10,5, "",0,0,"L",false);
				$pdf->CellFitScale(65,5, "Signature over printed name of the LVC Chairperson","T",0,"L",false);

				$yAxis += 5;
				$pdf->SetY($yAxis);
				$pdf->SetX($rigthBoxStartX);
				$pdf->CellFitScale(65,5, "Date:",0,0,"L",false);
				$pdf->CellFitScale(10,5, "",0,0,"L",false);
				$pdf->CellFitScale(65,5, "Date:",0,0,"L",false);
				//footer


				// header
				$rowCntPerPage = 0;
				$pdf->AddPage();
				$yAxis = $startOfY;
				$xAxis = $startOfX;

				$pdf->SetY($yAxis);
			    $pdf->SetX($xAxis);
			    $pdf->SetFont('Arial','',8);
			    $pdf->CellFitScale(277,4, "Instruction : Put a check mark in the column if it satisfies the criteria in the rating guide",1,0,'L',false);
				$pdf->SetFillColor(240, 248, 255);
			    $yAxis += 4;
			    $pdf->SetY($yAxis);
			    $pdf->SetX($xAxis);
			    $pdf->SetFont('Arial','B',8);
			    $pdf->CellFitScale($col1,$firstHeaderHeight, "Tracking No.",1,0,'C',true);
			    $pdf->CellFitScale($col2,$firstHeaderHeight, "Name of  Complainant",1,0,'C',true);
			    $pdf->CellFitScale(125,$firstHeaderHeight2, "Components/Indicators",1,0,'C',true);
			    $pdf->CellFitScale($col5,$firstHeaderHeight, "Final Rating",1,0,'C',true);
			    $pdf->CellFitScale($col6,$firstHeaderHeight, "Remarks",1,0,'C',true);

			    $yAxis += $firstHeaderHeight2;
			   	$xAxis += $col1+$col2;
			    $pdf->SetY($yAxis);
			    $pdf->SetX($xAxis);
			    $pdf->CellFitScale($col3,$secondHeaderHeight, "A. Employable Skills",1,0,'C',true);
			    $pdf->CellFitScale($col3,$secondHeaderHeight, "B. Financial Security",1,0,'C',true);
			    $pdf->CellFitScale(17,$secondHeaderHeight2, "C. Health",1,0,'C',true);
			    $pdf->CellFitScale(17,$secondHeaderHeight2, "D. Water & Sanitation",1,0,'C',true);
			    $pdf->CellFitScale(34,$secondHeaderHeight2, "E. Housing",1,0,'C',true);
			    $pdf->CellFitScale($col3,$secondHeaderHeight2, "F. Lighting Facility",1,0,'C',true);
			    $pdf->CellFitScale(17,$secondHeaderHeight2, "G. Education",1,0,'C',true);
			    $pdf->CellFitScale($col3,$secondHeaderHeight, "H. Location",1,0,'C',true);

			    $yAxis += $secondHeaderHeight2;
			    $xAxis += $col3+$col3;
			    $pdf->SetY($yAxis);
			    $pdf->SetX($xAxis);
			    $pdf->CellFitScale($col4,$thirdHeaderHeight, "I",1,0,'C',true);
			    $pdf->CellFitScale($col4,$thirdHeaderHeight, "II",1,0,'C',true);
			    $pdf->CellFitScale($col4,$thirdHeaderHeight, "I",1,0,'C',true);
			    $pdf->CellFitScale($col4,$thirdHeaderHeight, "II",1,0,'C',true);
			    $pdf->CellFitScale($col4,$thirdHeaderHeight, "I.1",1,0,'C',true);
			    $pdf->CellFitScale($col4,$thirdHeaderHeight, "I.1",1,0,'C',true);
			    $pdf->CellFitScale($col4,$thirdHeaderHeight, "II.1",1,0,'C',true);
			    $pdf->CellFitScale($col4,$thirdHeaderHeight, "II.2",1,0,'C',true);
			    $pdf->CellFitScale($col3,$thirdHeaderHeight, "II.2",1,0,'C',true);
			    $pdf->CellFitScale($col4,$thirdHeaderHeight, "I",1,0,'C',true);
			    $pdf->CellFitScale($col4,$thirdHeaderHeight, "II",1,0,'C',true);
			    $pdf->SetFont('Arial','',9);
			    // header

			}

			$rowCtr++;
		}

		//footer
		$yAxis += $rowHeight;
		$pdf->SetY($yAxis);
		$pdf->SetX($startOfX);
		$pdf->SetFont('Arial','',5);

		$pdf->CellFitScale($col1+$col2,$pointsHeight, "Points",1,0,"L",false);
		$pdf->CellFitScale($col3,$pointsHeight, "10",1,0,"C",false);
		$pdf->CellFitScale($col3,$pointsHeight, "5",1,0,"C",false);
		$pdf->CellFitScale($col4,$pointsHeight, "10",1,0,"C",false);
		$pdf->CellFitScale($col4,$pointsHeight, "10",1,0,"C",false);
		$pdf->CellFitScale($col4,$pointsHeight, "5",1,0,"C",false);
		$pdf->CellFitScale($col4,$pointsHeight, "5",1,0,"C",false);
		$pdf->CellFitScale($col4,$pointsHeight, "5",1,0,"C",false);
		$pdf->CellFitScale($col4,$pointsHeight, "5",1,0,"C",false);
		$pdf->CellFitScale($col4,$pointsHeight, "5",1,0,"C",false);
		$pdf->CellFitScale($col4,$pointsHeight, "5",1,0,"C",false);
		$pdf->CellFitScale($col3,$pointsHeight, "10",1,0,"C",false);
		$pdf->CellFitScale($col4,$pointsHeight, "10",1,0,"C",false);
		$pdf->CellFitScale($col4,$pointsHeight, "10",1,0,"C",false);
		$pdf->CellFitScale($col3,$pointsHeight, "5",1,0,"C",false);
		$pdf->CellFitScale($col5,$pointsHeight, "100",1,0,"C",false);
		$pdf->CellFitScale($col6,$pointsHeight, "",1,0,"C",false);

		$yAxis += $pointsHeight;
		$pdf->SetY($yAxis);
		$pdf->SetX($startOfX);
		$startOfBottomY = $yAxis;
		

		$pdf->CellFitScale($col1+$col2+$col3+$col3,37, "",1,0,"C",false);
		$pdf->CellFitScale($col4+$col4+$col4+$col4+$col4+$col4+$col4+$col4+$col3+$col4+$col4+$col3+$col5+$col6,37, "",1,0,"C",false);

		$yAxis += 1;
		$pdf->SetY($yAxis);
		$pdf->SetX($startOfX+3);
		$pdf->SetFont('Arial','B',10);
		$pdf->CellFitScale($col1+10,5, "Geographic Information:",0,0,"L",false);
		$pdf->SetFont('Arial','',10);

		$yAxis += 8;
		$pdf->SetY($yAxis);
		$pdf->SetX($startOfX+3);
		$pdf->CellFitScale($col1-5,5, "Region",0,0,"L",false);
		$pdf->CellFitScale(5,5, ":",0,0,"L",false);
		$pdf->CellFitScale(55,5, $regionName,"B",0,"L",false);

		$yAxis += 6;
		$pdf->SetY($yAxis);
		$pdf->SetX($startOfX+3);
		$pdf->CellFitScale($col1-5,5, "Province",0,0,"L",false);
		$pdf->CellFitScale(5,5, ":",0,0,"L",false);
		$pdf->CellFitScale(55,5, $provinceName,"B",0,"L",false);

		$yAxis += 6;
		$pdf->SetY($yAxis);
		$pdf->SetX($startOfX+3);
		$pdf->CellFitScale($col1-5,5, "City/Municipality",0,0,"L",false);
		$pdf->CellFitScale(5,5, ":",0,0,"L",false);
		$pdf->CellFitScale(55,5, $cityName,"B",0,"L",false);

		$yAxis += 6;
		$pdf->SetY($yAxis);
		$pdf->SetX($startOfX+3);
		$pdf->CellFitScale($col1-5,5, "Barangay",0,0,"L",false);
		$pdf->CellFitScale(5,5, ":",0,0,"L",false);
		$pdf->CellFitScale(55,5, $barangayName,"B",0,"L",false);

		// right box
		$rigthBoxStartX= $startOfX+3+$col1+$col2+$col3+$col3;
		$yAxis = $startOfBottomY+1;
		$pdf->SetY($yAxis);
		$pdf->SetX($rigthBoxStartX);
		$pdf->SetFont('Arial','B',10);
		$pdf->CellFitScale(25,5, "Certification:",0,0,"L",false);
		$pdf->SetFont('Arial','',10);
		$pdf->CellFitScale(100,5, "I hereby certify that the date set forth were reviewed by me",0,0,"L",false);

		$yAxis += 4;
		$pdf->SetY($yAxis);
		$pdf->SetX($rigthBoxStartX);
		$pdf->CellFitScale(125,5, "personally and in accordance with the guidelines provided.",0,0,"L",false);

		$yAxis += 20;
		$pdf->SetY($yAxis);
		$pdf->SetX($rigthBoxStartX);
		$pdf->SetFont('Arial','',9);
		$pdf->CellFitScale(65,5, "Signature over printed name of the BVT Chairperson","T",0,"L",false);
		$pdf->CellFitScale(10,5, "",0,0,"L",false);
		$pdf->CellFitScale(65,5, "Signature over printed name of the LVC Chairperson","T",0,"L",false);

		$yAxis += 5;
		$pdf->SetY($yAxis);
		$pdf->SetX($rigthBoxStartX);
		$pdf->CellFitScale(65,5, "Date:",0,0,"L",false);
		$pdf->CellFitScale(10,5, "",0,0,"L",false);
		$pdf->CellFitScale(65,5, "Date:",0,0,"L",false);
		//footer

	    //$filename = $currentFolder."/referral_".sprintf('%08d', $rowCtr).".pdf";
		$pdf->Output($dir, 'F');




	}

?>