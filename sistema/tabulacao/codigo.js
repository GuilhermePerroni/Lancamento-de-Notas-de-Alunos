var banco; //global


function criarAbrirBanco() {
	banco = openDatabase('ProClin','1.0','Sistema de Proteses Dentarias', 2 * 1024 * 1024);
	
	criaTabela();
	
	
	montaComboTurma();
	
	$(document).ready(function(){
    $('select').formSelect();
	});
}
	
	

	
function criaTabela() {
	banco.transaction(function (tx) {
		//tx.executeSql('drop table Alunos',
		tx.executeSql('create table if not exists Alunos (IdAluno int unique, Educacao text,ALUNOS text, CNS text, SEXO text, IDADE text, ED text, CP text, ATF text DEFAULT 0, CPO text DEFAULT 0, ART0 text DEFAULT 0, CEO	text DEFAULT 0, ART1	text DEFAULT 0, RISCO text, Observacao text, Endereco text, Telefone text, Selante text, DataNascimento date, Encaminhado text, Autorizado text, Evidenciacao text, Colaborativo text)',
		[],
		function (tx) {
			mostrarAlunos();				
		},
		seDerErro);
	});	
}


function esconder() {
	document.getElementById('esconde').style.display = "none";
	
	//document.getElementById('form-style-3').style.width = "99%";
}

function mostrar() {
	document.getElementById('esconde').style.display = "block";
	//document.getElementById('form-style-3').style.width = "80%";
}
	


function mostrarAlunos() {
	novoIdAluno();
	banco.transaction(function (tx) {
		tx.executeSql('select * from Alunos ',
		[],
		function (tx, results) {
			var tamanho = results.rows.length;
			var listaServicos = document.getElementById('listaAlunos');
			
			listaServicos.innerHTML = "";
			
			novoIdAluno();
			
			var i;
			var item = null;
			
			//document.getElementById('descricao').value = "";
			//document.getElementById('valorPadrao').value = "";
					

			

			document.getElementById('ALUNO').value = "";
			document.getElementById('CNS').value = "";
			document.getElementById('SEXO').value = "";
			document.getElementById('IDADE').value = "";
			document.getElementById('Endereco').value = "";
			
			document.getElementById('CP').selectedIndex = 0;
			document.getElementById('ATF').selectedIndex = 0;
			document.getElementById('RISCO').selectedIndex = 0;
			document.getElementById('Selante').selectedIndex = 0;
			document.getElementById('Encaminhado').selectedIndex = 0;
			document.getElementById('Autorizado').selectedIndex = 0;
			document.getElementById('Colaborativo').selectedIndex = 0;
			document.getElementById('Educacao').selectedIndex = 0;
			
			
			document.getElementById('CPO').value = "";
			document.getElementById('ART0').value = "";
			document.getElementById('CEO').value = "";
			document.getElementById('ART1').value = "";
			
			document.getElementById('Observacao').value = "";
			document.getElementById('Telefone').value = "";
			document.getElementById('DataNascimento').value = "";
			
			






			
						
				
			var cabecalho = "";
			var linhas = "";
			var rodape = "";
			
			cabecalho = ' <table class="bordered striped highlight  responsive-table">    ' +
			            ' <tr>                          				 ' + 
						'	<th class="center-align">N</th>          	 ' +
						'	<th class="">Aluno</th>                ' +
						'	<th class="">Cartão SUS</th>                   ' +
						'	<th class="">Sexo</th>                  ' +
						'	<th class="">Idade</th>                 ' +
						'	<th class="">Data de Nasc.</th>                    ' +
						
						'	<th class="">Endereco</th>                    ' +
						'	<th class="">Telefone</th>                    ' +
						'	<th class="">Educacao</th>                    ' +
						'	<th class="">Evi. Placa</th>                    ' +
						
						
						
						
						
						'	<th class="">Con. de Placa</th>                    ' +
						'	<th class="">CPO</th>                   ' +
						'	<th class="">ART (CPO)</th>                  ' +
						'	<th class="">CEO</th>                   ' +
						'	<th class="">ART (CEO)</th>                  ' +
						'	<th class="">RISCO</th>                 ' +	
						'	<th class="">Flúor Tópico</th>                   ' +
						'	<th class="">Selante</th>                    ' +
						
						
						
						'	<th class="">Enc. Fasipe</th>                 ' +	
						'	<th class="">Autorizado</th>                 ' +	
						'	<th class="">Colaborativo</th>                 ' +	
						'	<th class="">Observacao</th>                 ' +	
						
						
						' </tr>                                     ';
			rodape = '</table>';
		
		
		
		
		
			for(i=0; i < tamanho; i++) {
				item = results.rows.item(i);
				
				/*Observacao text, Endereco text, Telefone text, Selante text, DataNascimento date*/
				
				linhas = linhas + '<tr onclick="alterarAluno('+item['IdAluno']+')" >    ' +
								'<td class="center-align">' + item['IdAluno'] +' </td>    ' +
								
								'<td class="">            ' + item['ALUNOS']+' </td>     ' +
								'<td class="">            ' + item['CNS']+' </td>     ' +
								'<td class="">            ' + item['SEXO']+' </td>     ' +
								
								'<td class="">            ' + item['IDADE']+' </td>     ' +
								'<td class="">            ' + item['DataNascimento']+' </td>     ' +
								
								'<td class="">            ' + item['Endereco']+' </td>     ' +
								'<td class="">            ' + item['Telefone']+' </td>     ' +
								'<td class="">            ' + item['Educacao']+' </td>     ' +
								'<td class="">            ' + item['Evidenciacao']+' </td>     ' +
								
								
								
								'<td class="">            ' + item['CP']+' </td>     ' +
								'<td class="">            ' + item['CPO']+' </td>     ' +
								'<td class="">            ' + item['ART0']+' </td>     ' +
								'<td class="">            ' + item['CEO']+' </td>     ' +
								'<td class="">            ' + item['ART1']+' </td>     ' +
								'<td class="">            ' + item['RISCO']+' </td>     ' +
								'<td class="">            ' + item['ATF']+' </td>     ' +
								
								'<td class="">            ' + item['Selante']+' </td>     ' +
								
								
								'<td class="">            ' + item['Encaminhado']+' </td>     ' +
								'<td class="">            ' + item['Autorizado']+' </td>     ' +
								'<td class="">            ' + item['Colaborativo']+' </td>     ' +
								'<td class="">            ' + item['Observacao']+' </td>     ' +
								
								
								
								
								'</tr>                                                      ';
								
			}
			listaServicos.innerHTML += cabecalho + linhas + rodape; 
			somaTotais();
			
			 
			},	
		seDerErro);
	});
}

function validou() {
	if (document.getElementById('ALUNO').value == "") {
		var $toastContent = $('<span>Preencha o Campo Aluno!</span>');
        //Materialize.toast($toastContent, 5000);
		return false;			
	} else {
		return true;	
	}
}

function novoAluno() {	
	novoIdAluno();
	
	if (validou()) {
	
		banco.transaction(function (tx) {
			var idAluno  = document.getElementById('idAluno').value;
			//var Descricao  = document.getElementById('descricao').value;
			
			//var ValorPadrao      = document.getElementById('valorPadrao').value;
		
		
			
			//Descricao = Descricao.toUpperCase();
			
			
			var ALUNOS = document.getElementById('ALUNO').value;
			var CNS	 = document.getElementById('CNS').value;
			
			var SEXO = document.getElementById('SEXO').value;
			
			//SEXO = SEXO.value;
			
			
			
			
			var IDADE = document.getElementById('IDADE').value;
			var ED   = document.getElementById('Endereco').value;
			var CP	 = document.getElementById('CP').value;
			var ATF	 = document.getElementById('ATF').value;
			var CPO	 = document.getElementById('CPO').value;
			var ART0 = document.getElementById('ART0').value;
			var CEO	 = document.getElementById('CEO').value;
			var ART1 = document.getElementById('ART1').value;
			var RISCO = document.getElementById('RISCO').value;

			var Observacao = document.getElementById('Observacao').value;
			//var Endereco = document.getElementById('Endereco').value;
			var Telefone = document.getElementById('Telefone').value;
			var Selante = document.getElementById('Selante').value;
			var DataNascimento = document.getElementById('DataNascimento').value;
			
			
			
			var Encaminhado = document.getElementById('Encaminhado').value;
			var Autorizado = document.getElementById('Autorizado').value;
			var Colaborativo = document.getElementById('Colaborativo').value;
			
			var Educacao = document.getElementById('Educacao').value;
			var Evidenciacao = document.getElementById('Evidenciacao').value;
			
			


			ALUNOS = ALUNOS.toUpperCase(); 
			CNS	   = CNS.toUpperCase();	  
			SEXO   = SEXO.toUpperCase();  	
			IDADE  = IDADE.toUpperCase(); 	
			ED     = ED.toUpperCase();    
			CP	   = CP.toUpperCase();	  
			ATF	   = ATF.toUpperCase();	  
			CPO	   = CPO.toUpperCase();	  
			ART0   = ART0.toUpperCase();  
			CEO	   = CEO.toUpperCase();	  
			ART1   = ART1.toUpperCase();  
            RISCO  = RISCO.toUpperCase(); 
			Educacao = Educacao.toUpperCase();
			
			Encaminhado   = Encaminhado.toUpperCase(); 
			Autorizado	  = Autorizado.toUpperCase(); 
			Colaborativo  = Colaborativo.toUpperCase(); 
			
			
			Observacao 		= Observacao.toUpperCase(); 		
			//Endereco        = Endereco.toUpperCase();      
			Telefone 		= Telefone.toUpperCase(); 		
			Selante  		= Selante.toUpperCase();  		
			DataNascimento  = DataNascimento.toUpperCase();
			Evidenciacao    = Evidenciacao.toUpperCase(); 
			
			
			
			if (CP=="") {
				CP = "0";
			}
			
			if (ATF=="") {
				ATF = "0";
			}
			
			if (CPO=="") {
				CPO = "0";
			}
			
			if (ART0=="") {
				ART0 = "0";
			}
			
			if (CEO=="") {
				CEO = "0";
			}
			
			if (ART1=="") {
				ART1 = "0";
			}
			
			
			
			tx.executeSql('insert into Alunos (IdAluno, ALUNOS,	CNS	, SEXO	, IDADE	, ED	, CP	, ATF	, CPO	, ART0	, CEO	, ART1	, RISCO, Observacao, Endereco     , Telefone 	, Selante  	,DataNascimento, Encaminhado, Autorizado, Colaborativo, Educacao, Evidenciacao) values (?,?,?,?,?,?,?,?, ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
			[idAluno, ALUNOS,	CNS	, SEXO	, IDADE	, ED	, CP	, ATF	, CPO	, ART0	, CEO	, ART1	, RISCO, Observacao, ED     , Telefone 	, Selante  	,DataNascimento, Encaminhado, Autorizado, Colaborativo, Educacao, Evidenciacao],
			
			
			
			
			
			
			function (tx) {; 
				mostrarAlunos();

				
				
				
			},
			seDerErro);
		});	
	}	
}

function novoIdAluno() {
	banco.transaction(function (tx) {
		var idAluno = document.getElementById('idAluno');
	
	    texto = 'select MAX(IdAluno) Id from Alunos'
	
		tx.executeSql(texto ,
		[],
		
		function (tx, results) {
			
			item = results.rows.item(0);
			
			valor = 0;
			valor = item['Id'];
			
			if (valor >=0 ) {
				idAluno.value = item['Id'] + 1 ; 
			} else {
				idAluno.value = 1; 	
			}
				
		},
		seDerErro);
	});
}

function atualizaAluno() {
	var idAluno   = document.getElementById('idAluno').value;
	
			var ALUNOS	 = document.getElementById('ALUNO').value;
			var CNS	     = document.getElementById('CNS').value;
			var SEXO	 = document.getElementById('SEXO').value;
			var IDADE	 = document.getElementById('IDADE').value;
			var ED   = document.getElementById('Endereco').value;
			var CP	 = document.getElementById('CP').value;
			var ATF	 = document.getElementById('ATF').value;
			var CPO	 = document.getElementById('CPO').value;
			var ART0 = document.getElementById('ART0').value;
			var CEO	 = document.getElementById('CEO').value;
			var ART1 = document.getElementById('ART1').value;
			var RISCO = document.getElementById('RISCO').value;
	
			var Observacao = document.getElementById('Observacao').value;
			//var Endereco = document.getElementById('Endereco').value;
			var Telefone = document.getElementById('Telefone').value;
			var Selante = document.getElementById('Selante').value;
			var DataNascimento = document.getElementById('DataNascimento').value;
			var Encaminhado = document.getElementById('Encaminhado').value;
			var Autorizado = document.getElementById('Autorizado').value;
			var Colaborativo = document.getElementById('Colaborativo').value;
			
			var Educacao = document.getElementById('Educacao').value;
			var Evidenciacao = document.getElementById('Evidenciacao').value;
			
			
			
			
			ALUNOS = ALUNOS.toUpperCase(); 
			CNS	   = CNS.toUpperCase();	  
			SEXO   = SEXO.toUpperCase();  	
			IDADE  = IDADE.toUpperCase(); 	
			ED     = ED.toUpperCase();    
			CP	   = CP.toUpperCase();	  
			ATF	   = ATF.toUpperCase();	  
			CPO	   = CPO.toUpperCase();	  
			ART0   = ART0.toUpperCase();  
			CEO	   = CEO.toUpperCase();	  
			ART1   = ART1.toUpperCase();  
            RISCO  = RISCO.toUpperCase(); 
			
			Encaminhado   = Encaminhado.toUpperCase(); 
			Autorizado	  = Autorizado.toUpperCase(); 
			Colaborativo  = Colaborativo.toUpperCase(); 
			Educacao      = Educacao.toUpperCase();
			Evidenciacao  = Evidenciacao.toUpperCase();
		
			
			
			Observacao 		= Observacao.toUpperCase(); 		
			//Endereco        = Endereco.toUpperCase();      
			Telefone 		= Telefone.toUpperCase(); 		
			Selante  		= Selante.toUpperCase();  		
			DataNascimento  = DataNascimento.toUpperCase();
			
	
				
	
	banco.transaction(function (tx) {
	tx.executeSql(' update Alunos set ALUNOS=?,	CNS=?	, SEXO=?	, IDADE=?	, ED=?	, CP=?	, ATF=?	, CPO=?	, ART0=?	, CEO=?	, ART1=?	, RISCO=?, Observacao=?, Endereco=?, Telefone=?, Selante=?, DataNascimento=?, Encaminhado=?, Autorizado=?, Colaborativo=?, Educacao=?, Evidenciacao=?    where IdAluno = ?', 
	[ALUNOS,	CNS	, SEXO	, IDADE	, ED	, CP	, ATF	, CPO	, ART0	, CEO	, ART1	, RISCO, Observacao, ED, Telefone, Selante, DataNascimento, Encaminhado, Autorizado, Colaborativo, Educacao,Evidenciacao,idAluno], 
	function (tx, results) {
		mostrarAlunos();	
	}, 
		seDerErro);
	});
}

function excluiAluno() {
	var IdAluno = document.getElementById('idAluno').value;
	banco.transaction(function (tx) {
	tx.executeSql(' delete from Alunos where IdAluno = ?', 
	[IdAluno], 
	function (tx, results) {
		mostrarAlunos();
		novoIdAluno();		
	}, 
		seDerErro);
	});
}

function alterarAluno(IdAluno) {	
	banco.transaction(function (tx) {
		tx.executeSql('select * from Alunos where IdAluno = ?',
		[IdAluno],
		function (tx, results) {
			var item = results.rows.item(0);
			
			
			var idAluno  = document.getElementById('idAluno');
			
			
			var ALUNOS	 = document.getElementById('ALUNO');
			var CNS	     = document.getElementById('CNS');
			var SEXO	 = document.getElementById('SEXO');
			var IDADE	 = document.getElementById('IDADE');
			var ED   = document.getElementById('Endereco');
			var CP	 = document.getElementById('CP');
			var ATF	 = document.getElementById('ATF');
			var CPO	 = document.getElementById('CPO');
			var ART0 = document.getElementById('ART0');
			var CEO	 = document.getElementById('CEO');
			var ART1 = document.getElementById('ART1');
			var RISCO = document.getElementById('RISCO');
			var Observacao = document.getElementById('Observacao');
			var Endereco = document.getElementById('Endereco');
			var Telefone = document.getElementById('Telefone');
			var Selante = document.getElementById('Selante');
			var DataNascimento = document.getElementById('DataNascimento');
			var Encaminhado = document.getElementById('Encaminhado');
			var Autorizado = document.getElementById('Autorizado');
			var Colaborativo = document.getElementById('Colaborativo');
			var Educacao = document.getElementById('Educacao');
			var Evidenciacao = document.getElementById('Evidenciacao');
			
			
			
			
			
			idAluno.value   = IdAluno;
           
			
			ALUNOS.value	 = item['ALUNOS'];
			CNS.value		 = item['CNS'];
			//SEXO.value		 = item['SEXO'];
			IDADE.value		 = item['IDADE'];
			ED.value   		 = item['Endereco'];
			//CP.value		 = item['CP'];
			//ATF.value		 = item['ATF'];
			CPO.value		 = item['CPO'];
			ART0.value 		 = item['ART0'];
			CEO.value		 = item['CEO'];
			ART1.value 		 = item['ART1'];
			//RISCO.value 	 = item['RISCO'];
			Educacao.value   = item['Educacao'];
			Evidenciacao.value = item['Evidenciacao'];


			Observacao.value 		= item['Observacao'];
			//Endereco.value 		= item['Endereco'];
			Telefone.value 		= item['Telefone'];
			//Selante.value 		= item['Selante'];
			DataNascimento.value  = item['DataNascimento'];
			
			
			
			
			
			
			
			if (item['SEXO'] == "MASCULINO") {
				SEXO.selectedIndex = 0;	
			}
			
			if (item['SEXO'] == "FEMININO") {
				SEXO.selectedIndex = 1;	
			}
			
			if (item['CP'] == "SIM") {
				CP.selectedIndex = 0;	
			}
			
			if (item['CP'] == "NAO") {
				CP.selectedIndex = 1;
			}
			
			if (item['ATF'] == "SIM") {
				ATF.selectedIndex = 0;	
			}
			
			if (item['ATF'] == "NAO") {
				ATF.selectedIndex = 1;
			}
			
			if (item['Encaminhado'] == "SIM") {
				Encaminhado.selectedIndex = 0;	
			}
			
			if (item['Encaminhado'] == "NAO") {
				Encaminhado.selectedIndex = 1;
			}
			
			if (item['Autorizado'] == "SIM") {
				Autorizado.selectedIndex = 0;	
			}
			
			if (item['Autorizado'] == "NAO") {
				Autorizado.selectedIndex = 1;
			}
			
			if (item['Colaborativo'] == "SIM") {
				Colaborativo.selectedIndex = 0;	
			}
			
			if (item['Colaborativo'] == "NAO") {
				Colaborativo.selectedIndex = 1;
			}
			
			if (item['Selante'] == "SIM") {
				Selante.selectedIndex = 0;	
			}
			
			if (item['Selante'] == "NAO") {
				Selante.selectedIndex = 1;
			}
			
			if (item['Educacao'] == "SIM") {
				Educacao.selectedIndex = 0;	
			}
			
			if (item['Educacao'] == "NAO") {
				Educacao.selectedIndex = 1;
			}
			
			Evidenciacao
			
			if (item['Evidenciacao'] == "SIM") {
				Evidenciacao.selectedIndex = 0;	
			}
			
			if (item['Evidenciacao'] == "NAO") {
				Evidenciacao.selectedIndex = 1;
			}
			
			
			if (item['RISCO'] == "BAIXO") {
				RISCO.selectedIndex = 0;	
			}
			
			if (item['RISCO'] == "MEDIO") {
				RISCO.selectedIndex = 1;
			}
			
			if (item['RISCO'] == "ALTO") {
				RISCO.selectedIndex = 2;
			}
			
			
			
			
			
			$(document).ready(function(){
				$('select').formSelect();
			});
			
			
            			
            
			
		},	
		seDerErro);
	});
	
}

function somaTotais() {
	banco.transaction(function (tx) {
		
		
		texto = 'select count(IdAluno) as Qtde from Alunos '
	
		tx.executeSql(texto,
		[],
		
		function (tx, results) {
			var item = results.rows.item(0);
			
			var listaTotaisAlunos = document.getElementById('listaTotaisAlunos');
			var texto = item['Qtde'];
			
			listaTotaisAlunos.innerHTML = 'Quantidade Total de Alunos..: ' + texto;
				
		},
		seDerErro);
		
		
		
	    texto = 'select count(IdAluno) as QtdeMeninos from Alunos where SEXO = "MASCULINO"'
	
		tx.executeSql(texto,
		[],
		
		function (tx, results) {
			var item = results.rows.item(0);
			
			var listaTotaisMeninos = document.getElementById('listaTotaisMeninos');
			var texto = item['QtdeMeninos'];
			
			listaTotaisMeninos.innerHTML = 'Qtde Masculino..: ' + texto;
				
		},
		seDerErro);
		
		texto = 'select count(IdAluno) as QtdeMeninas from Alunos where SEXO = "FEMININO"'
	
		tx.executeSql(texto,
		[],
		
		function (tx, results) {
			var item = results.rows.item(0);
			
			var listaTotaisMeninas = document.getElementById('listaTotaisMeninas');
			var texto = item['QtdeMeninas'];
			
			listaTotaisMeninas.innerHTML = 'Qtde Feminino..: ' + texto;
				
		},
		seDerErro);
		
		
		/*texto = 'select sum(ED) as TotalED from Alunos '
	
		tx.executeSql(texto,
		[],
		
		function (tx, results) {
			var item = results.rows.item(0);
			
			var listaTotalED = document.getElementById('listaTotalED');
			var texto = item['TotalED'];
			
			listaTotalED.innerHTML = 'Total ED ..: ' + texto;
				
		},
		seDerErro);
		
		/*texto = 'select sum(CP) as TotalCP from Alunos '
	
		tx.executeSql(texto,
		[],
		
		function (tx, results) {
			var item = results.rows.item(0);
			
			var listaTotalCP = document.getElementById('listaTotalCP');
			var texto = item['TotalCP'];
			
			listaTotalCP.innerHTML = 'Total CP ..: ' + texto;
				
		},
		seDerErro);*/
		
		/*texto = 'select sum(ATF) as TotalATF from Alunos '
	
		tx.executeSql(texto,
		[],
		
		function (tx, results) {
			var item = results.rows.item(0);
			
			var listaTotalATF = document.getElementById('listaTotalATF');
			var texto = item['TotalATF'];
			
			listaTotalATF.innerHTML = 'Total ATF ..: ' + texto;
				
		},
		seDerErro);*/			
					
		texto = 'select sum(CPO) as TotalCPO from Alunos '
	
		tx.executeSql(texto,
		[],
		
		function (tx, results) {
			var item = results.rows.item(0);
			
			var listaTotalCPO = document.getElementById('listaTotalCPO');
			var texto = item['TotalCPO'];
			
			listaTotalCPO.innerHTML = 'Total CPO ..: ' + texto;
				
		},
		seDerErro);	

		
					
		texto = 'select sum(ART0) as TotalART0 from Alunos '
	
		tx.executeSql(texto,
		[],
		
		function (tx, results) {
			var item = results.rows.item(0);
			
			var listaTotalART0 = document.getElementById('listaTotalART0');
			var texto = item['TotalART0'];
			
			listaTotalART0.innerHTML = 'Total ATR(CPO) ..: ' + texto;
				
		},
		seDerErro);	
					
		
		texto = 'select sum(CEO) as TotalCEO from Alunos '
	
		tx.executeSql(texto,
		[],
		
		function (tx, results) {
			var item = results.rows.item(0);
			
			var listaTotalCEO = document.getElementById('listaTotalCEO');
			var texto = item['TotalCEO'];
			
			listaTotalCEO.innerHTML = 'Total CEO ..: ' + texto;
				
		},
		seDerErro);	

		
		
		texto = 'select sum(ART1) as TotalART1 from Alunos '
	
		tx.executeSql(texto,
		[],
		
		
		
		function (tx, results) {
			var item = results.rows.item(0);
			
			var listaTotalCPO = document.getElementById('listaTotalART1');
			var texto = item['TotalART1'];
			
			listaTotalART1.innerHTML = 'Total ART(CEO)..: ' + texto;
				
		},
		seDerErro);		
		

		
		
	});
}

function montaComboTurma() {
	banco.transaction(function (tx) {
		tx.executeSql('select * from TTurma ',
		[],
		function (tx, results) {
			var tamanho = results.rows.length;
			var listaTurmas = document.getElementById('listaTurmas');
			
			listaTurmas.innerHTML = " ";
			
			var corpo;
			var i;
			var item = null;
	
			cabecalho = '<div class="input-field col s3">'+
						'<select class="uppercase" id="comboTurma" name="comboTurma"> ';
	
							
			for(i=0; i < tamanho; i++) {
				item = results.rows.item(i);
				
				
			corpo =  corpo + ' <option value="' + item['IdTurma'] + '">' + item['Descricao'] + ' </option> ';
					
			}
			
			rodape = ' </select>  <label for="comboTurma"> Turma </label> </div> ';
			
			listaTurmas.innerHTML += cabecalho + corpo + rodape;
			
			
			$(document).ready(function(){
				$('select').formSelect();
			});	
			
			},	
		seDerErro);
	});
}



function limpadados() {
	
			var ALUNOS	 = document.getElementById('ALUNO').value;
			var CNS	     = document.getElementById('CNS').value;
			var SEXO	 = document.getElementById('SEXO').value;
			var IDADE	 = document.getElementById('IDADE').value;
			var ED   = document.getElementById('Endereco').value;
			var CP	 = document.getElementById('CP').value;
			var ATF	 = document.getElementById('ATF').value;
			var CPO	 = document.getElementById('CPO').value;
			var ART0 = document.getElementById('ART0').value;
			var CEO	 = document.getElementById('CEO').value;
			var ART1 = document.getElementById('ART1').value;
			var RISCO = document.getElementById('RISCO').value;
	
			var Observacao = document.getElementById('Observacao').value;
			//var Endereco = document.getElementById('Endereco').value;
			var Telefone = document.getElementById('Telefone').value;
			var Selante = document.getElementById('Selante').value;
			var DataNascimento = document.getElementById('DataNascimento').value;
			var Encaminhado = document.getElementById('Encaminhado').value;
			var Autorizado = document.getElementById('Autorizado').value;
			var Colaborativo = document.getElementById('Colaborativo').value;
			
			ALUNOS 			= "";
			CNS	   			= "";
			SEXO   			= "";
			IDADE  			= "";
			ED     			= "";
			CP	   			= "";
			ATF	   			= "";
			CPO	   			= "";
			ART0   			= "";
			CEO	   			= "";
			ART1   			= "";
            RISCO  			= "";
			Encaminhado     = "";
			Autorizado	    = "";
			Colaborativo    = "";
			Observacao 		= "";	
			Telefone 		= "";
			Selante  		= "";
			DataNascimento  = "";
	
}







