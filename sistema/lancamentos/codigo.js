var banco; //global


function criarAbrirBanco() {
	banco = openDatabase('ProClin','1.0','Sistema de Proteses Dentarias', 2 * 1024 * 1024);
	//status.innerHTML = 'Banco Banco Criado e Aberto';
	
	/*alert('ok, Banco Criado e Aberto!');*/
	
	
	//document.getElementById('descricaoAluno').value = numeroaluno;
	
	criarTabelas();
	
	
	montaComboTurma();
	
	
	montaComboProcedimento1();
	montaComboProcedimento2();
	montaComboProcedimento3();
	montaComboProcedimento4();
	
	
	
}
	
function seDerErro(tx, error) {
	alert('Deu Erro: '+ error.message);			
}

function criarTabelas() {
	banco.transaction(function (tx) {
		//tx.executeSql('drop table TLancamento',
		tx.executeSql('create table if not exists TLancamento                                  '+
		              '(IdLancamento int unique, idAluno int, nomePaciente text, datalancamento date,                '+
					  ' idProcedimento1 int, idProcedimento2 int, idProcedimento3 int, idProcedimento4 int,  '+
					  'nota text, obs text)',
		[],
		function (tx) {/*alert('Tabela Tipos de Serviço Criou Certo')*/; },
		seDerErro);
	});
}


function validou() {
	if (document.getElementById('nota').value == "") {
		var $toastContent = $('<span>Preencha o Campo Nome!</span>');
        Materialize.toast($toastContent, 5000);
		return false;			
	} else {
		return true;	
	}
}

//TipoServico
function inserirLancamento() {
	//var descricao = document.getElementById('nota');
	novoIdLancamento();
	
	if (validou()) {
	
		banco.transaction(function (tx) {
			var codigo    = document.getElementById('idLancamento').value;
		
			
			var idAluno               = document.getElementById('comboAlunos').selectedIndex  + 1;;
			var nomePaciente          = document.getElementById('nomePaciente').value;
			
			
			var idProcedimento1        = document.getElementById('comboProcedimentos1').selectedIndex  + 1;
			var idProcedimento2        = document.getElementById('comboProcedimentos2').selectedIndex  + 1;
			var idProcedimento3        = document.getElementById('comboProcedimentos3').selectedIndex  + 1;
			var idProcedimento4        = document.getElementById('comboProcedimentos4').selectedIndex  + 1;
			
			
			
			
			
			
			
			var datalancamento                  = document.getElementById('datalancamento').value;
			
			var nota                  = document.getElementById('nota').value;
			var obs                   = document.getElementById('obs').value;
		    
			
			nomePaciente = nomePaciente.toUpperCase();
			obs = obs.toUpperCase();
			
			tx.executeSql('insert into TLancamento (IdLancamento, idAluno,datalancamento, nomePaciente, idProcedimento1, idProcedimento2,idProcedimento3,idProcedimento4, nota, obs) values (?,?,?,?,?,?,?,?,?,?)',
			[codigo, idAluno, datalancamento,nomePaciente, idProcedimento1,idProcedimento2,idProcedimento3,idProcedimento4, nota, obs],
			
			function (tx) {/*alert('Registro Inserido com sucesso'); mostrarDentistas()*/; 
				mostrarLancamento(); 	
				
			},
			seDerErro);
		});
		
	}
	
}

function novoIdLancamento() {
	banco.transaction(function (tx) {
		var codigo    = document.getElementById('idLancamento');
	
	    texto = 'select MAX(IdLancamento) Id from TLancamento'
	
		tx.executeSql(texto ,
		[],
		
		function (tx, results) {
			
			item = results.rows.item(0);
			
			valor = 0;
			valor = item['Id'];
			
			if (valor >=0 ) {
				codigo.value = item['Id'] + 1 ; 
			} else {
				codigo.value = 1; 	
			}
				
		},
		seDerErro);
	});
}

function abreLancamento(){
	window.open('http://www.google.com.br');
}

function mostrarLancamento() {
	
	listaLancamento.innerHTML = "   ";
	
	banco.transaction(function (tx) {
		
		
		where = '';
		
		var aluno = document.getElementById('comboAlunos').selectedIndex  + 1;
		
		where = ' where Alu.idAluno = ' + aluno;
		
		
		
		tx.executeSql('select Lan.*, Alu.Descricao as NomeAluno, Proc1.Descricao as Procedimento1,    '+
                      '	Proc2.Descricao as Procedimento2, Proc3.Descricao as Procedimento3, Proc4.Descricao as Procedimento4	'+  
					  
					  
              			'  from TLancamento as Lan left join TAluno        as Alu   on (Lan.IdAluno = Alu.IdAluno)     				'+
			  			'                          left join TProcedimento as Proc1 on (Lan.idProcedimento1 = Proc1.IdProcedimento)   '+
			  			'                          left join TProcedimento as Proc2 on (Lan.idProcedimento2 = Proc2.IdProcedimento)   '+
			  			'                          left join TProcedimento as Proc3 on (Lan.idProcedimento3 = Proc3.IdProcedimento)   '+
			  			'                          left join TProcedimento as Proc4 on (Lan.idProcedimento4 = Proc4.IdProcedimento)   '+
			  			
			  			
			  			'' + where,
			  
			  
			 
			  [],
		function (tx, results) {
			var tamanho = results.rows.length;
			var listaLancamento = document.getElementById('listaLancamento');
			
			listaLancamento.innerHTML = "   ";
			novoIdLancamento();
			
			
			document.getElementById('nomePaciente').value = '';
			
			
			 
			
			
			
			$(document).ready(function(){
				$('select').formSelect();
			});	
			
			 document.getElementById('datalancamento').value = '';
			
			document.getElementById('nota').value = '';
			document.getElementById('obs').value = '';
		    
			
			
			var i;
			var item = null;
			
				
			var cabecalho = "";
			var linhas = "";
			var rodape = "";
			
			cabecalho = ' <table class="bordered striped highlight">                    ' +
			            ' <tr>                                  ' + 
						'	<th class="">Nº</th>         ' +
						
						'	<th class="">Aluno</th>        ' +
						'	<th class="">Paciente</th>        ' +
						'	<th class="">Data</th>        ' +
						'	<th class="">Procedimento 1</th>        ' +
						'	<th class="">Procedimento 2</th>        ' +
						'	<th class="">Procedimento 3</th>        ' +
						'	<th class="">Procedimento 4</th>        ' +
						'	<th class="">Nota</th>        ' +
						'	<th class="">Obs</th>        ' +
						
						
						' </tr>                                 ';
			rodape = '</table>';
			
						
			for(i=0; i < tamanho; i++) {
				item = results.rows.item(i);
				
				
				//texto = ' <div class="paragrafo" onclick="alterarLancamento('+item['IdLancamento']+')"> <b>Nº</b> : ' + item['IdLancamento'] + '       |     <b>Lancamento :</b> ' + item['Descricao']+' </div> <br>'
				
				
				item['datalancamento'] = formataData(item['datalancamento']);
				
				linhas = linhas + '<tr onclick="alterarLancamento('+item['IdLancamento']+')" >' +
							  '<td class="">' + item['IdLancamento'] +' </td>    ' +
							  
							  '<td class="">' + item['NomeAluno']       +' </td>    ' +
							  '<td class="">' + item['nomePaciente']       +' </td>    ' +
							  '<td class="">' + item['datalancamento']       +' </td>    ' +
							  
							  '<td class="">' + item['Procedimento1']       +' </td>    ' +
							  '<td class="">' + item['Procedimento2']       +' </td>    ' +
							  '<td class="">' + item['Procedimento3']       +' </td>    ' +
							  '<td class="">' + item['Procedimento4']       +' </td>    ' +
							  '<td class="">' + item['nota']       +' </td>    ' +
							  '<td class="">' + item['obs']       +' </td>    ' +
							  '</tr>                                                  ';
				
			}
			
			listaLancamento.innerHTML += cabecalho + linhas + rodape; 
			
			},	
		seDerErro);
	});
}

function excluirLancamento() {
	var IdLancamento = document.getElementById('idLancamento').value;
	banco.transaction(function (tx) {
	tx.executeSql(' delete from TLancamento where IdLancamento = ?', 
	[IdLancamento], 
	function (tx, results) {
		mostrarLancamento();
		novoIdLancamento();
	}, 
		seDerErro);
	});
}

function atualizarLancamento() {
	var IdLancamento = document.getElementById('idLancamento').value;
	
	
	
			var idAluno               = document.getElementById('comboAlunos').selectedIndex    + 1;
			var nomePaciente          = document.getElementById('nomePaciente').value;
			
			var idProcedimento1        = document.getElementById('comboProcedimentos1').selectedIndex    + 1;
			var idProcedimento2        = document.getElementById('comboProcedimentos2').selectedIndex  + 1;
			var idProcedimento3        = document.getElementById('comboProcedimentos3').selectedIndex  + 1;
			var idProcedimento4        = document.getElementById('comboProcedimentos4').selectedIndex  + 1;
			
			
			
			var datalancamento                  = document.getElementById('datalancamento').value;
			
			var nota                  = document.getElementById('nota').value;
			var obs                   = document.getElementById('obs').value;
	
	obs = obs.toUpperCase();
	nomePaciente = nomePaciente.toUpperCase();
	
	
	
	banco.transaction(function (tx) {
	tx.executeSql(' update TLancamento set idAluno = ?, datalancamento=?, nomePaciente = ?, idProcedimento1 = ?,idProcedimento2 = ?,idProcedimento3 = ?,idProcedimento4 = ?,nota = ?, obs = ? where IdLancamento = ?', 
	[idAluno,datalancamento, nomePaciente, idProcedimento1,idProcedimento2,idProcedimento3,idProcedimento4, nota, obs, IdLancamento], 
	function (tx, results) {
		mostrarLancamento();	
	}, 
		seDerErro);
	});
}

function alterarLancamento(IdLancamento) {	
	banco.transaction(function (tx) {
		tx.executeSql('select * from TLancamento where IdLancamento = ?',
		[IdLancamento],
		function (tx, results) {
			var item = results.rows.item(0);
			
			
			
			
			var codigo    = document.getElementById('idLancamento');
			
			
			var idAluno               = document.getElementById('comboAlunos');
			
			var nomePaciente          = document.getElementById('nomePaciente');
			
			
			
			var comboProcedimento1 = document.getElementById('comboProcedimentos1');
			var comboProcedimento2 = document.getElementById('comboProcedimentos2');
			var comboProcedimento3 = document.getElementById('comboProcedimentos3');
			var comboProcedimento4 = document.getElementById('comboProcedimentos4');
			
			
			var datalancamento                  = document.getElementById('datalancamento');
			var nota                  = document.getElementById('nota');
			var obs                   = document.getElementById('obs');
			
			codigo.value = IdLancamento;
			
			
			
			
			
			
			idAluno.selectedIndex    = item['idAluno']-1;
			
			nomePaciente.value           = item['nomePaciente'];
			
			comboProcedimento1.selectedIndex = item['idProcedimento1']-1;
			comboProcedimento2.selectedIndex = item['idProcedimento2']-1;
			comboProcedimento3.selectedIndex = item['idProcedimento3']-1;
			comboProcedimento4.selectedIndex = item['idProcedimento4']-1;
			
			datalancamento.value                   = item['datalancamento'];
			nota.value                   = item['nota'];
			obs.value                    = item['obs'];

		
			$(document).ready(function(){
				$('select').formSelect();
			});	
			
		},	
		
		
		
		
		seDerErro);
	});
	
}
//TipoServico

function montaComboAluno() {
	banco.transaction(function (tx) {
		
		
		where = '';
		
		var turma = document.getElementById('comboTurma').selectedIndex  + 1;
		
		where = ' where turma = ' + turma;
		
		
		tx.executeSql('select * from TAluno ' + where,
		[],
		function (tx, results) {
			var tamanho = results.rows.length;
			var listaAlunos = document.getElementById('listaAlunos');
			
			listaAlunos.innerHTML = " ";
			
			var corpo;
			var i;
			var item = null;
	
			cabecalho = '<div class="input-field col s3">'+
						'<select onchange="mostrarLancamento()" class="uppercase" id="comboAlunos" name="comboAlunos"> ';
	
							
			for(i=0; i < tamanho; i++) {
				item = results.rows.item(i);
				
				
			corpo =  corpo + ' <option value="' + item['IdAluno'] + '">' + item['Descricao'] + ' </option> ';
					
			}
			
			rodape = ' </select> <label for="comboAlunos"> Aluno </label> </div> ';
			
			listaAlunos.innerHTML += cabecalho + corpo + rodape;
			
			
			$(document).ready(function(){
				$('select').formSelect();
			});	
			
			},	
		seDerErro);
	});
}

function montaComboProcedimento1() {
	banco.transaction(function (tx) {
		tx.executeSql('select * from TProcedimento ',
		[],
		function (tx, results) {
			var tamanho = results.rows.length;
			var listaProcedimentos = document.getElementById('listaProcedimentos1');
			
			listaProcedimentos.innerHTML = " ";
			
			var corpo;
			var i;
			var item = null;
	
			cabecalho = '<div class="input-field col s3">'+
			            
						'<select class="uppercase" id="comboProcedimentos1" name="comboProcedimentos1"> ';
	
							
			for(i=0; i < tamanho; i++) {
				item = results.rows.item(i);
				
				
			corpo =  corpo + ' <option value="' + item['IdProcedimento'] + '">' + item['Descricao'] + ' </option> ';
					
			}
			
			rodape = '   </select> <label for="comboProcedimentos"> Procedimento 1 </label> </div> ';
			
			listaProcedimentos.innerHTML += cabecalho + corpo + rodape;
			
			
			$(document).ready(function(){
				$('select').formSelect();
			});	
			
			},	
		seDerErro);
	});
}

function montaComboProcedimento2() {
	banco.transaction(function (tx) {
		tx.executeSql('select * from TProcedimento ',
		[],
		function (tx, results) {
			var tamanho = results.rows.length;
			var listaProcedimentos = document.getElementById('listaProcedimentos2');
			
			listaProcedimentos.innerHTML = " ";
			
			var corpo;
			var i;
			var item = null;
	
			cabecalho = '<div class="input-field col s3">'+
			            
						'<select class="uppercase" id="comboProcedimentos2" name="comboProcedimentos2"> ';
	
							
			for(i=0; i < tamanho; i++) {
				item = results.rows.item(i);
				
				
			corpo =  corpo + ' <option value="' + item['IdProcedimento'] + '">' + item['Descricao'] + ' </option> ';
					
			}
			
			rodape = '   </select> <label for="comboProcedimentos"> Procedimento 2 </label> </div> ';
			
			listaProcedimentos.innerHTML += cabecalho + corpo + rodape;
			
			
			$(document).ready(function(){
				$('select').formSelect();
			});	
			
			},	
		seDerErro);
	});
}

function montaComboProcedimento3() {
	banco.transaction(function (tx) {
		tx.executeSql('select * from TProcedimento ',
		[],
		function (tx, results) {
			var tamanho = results.rows.length;
			var listaProcedimentos = document.getElementById('listaProcedimentos3');
			
			listaProcedimentos.innerHTML = " ";
			
			var corpo;
			var i;
			var item = null;
	
			cabecalho = '<div class="input-field col s3">'+
			            
						'<select class="uppercase" id="comboProcedimentos3" name="comboProcedimentos3"> ';
	
							
			for(i=0; i < tamanho; i++) {
				item = results.rows.item(i);
				
				
			corpo =  corpo + ' <option value="' + item['IdProcedimento'] + '">' + item['Descricao'] + ' </option> ';
					
			}
			
			rodape = '   </select> <label for="comboProcedimentos"> Procedimento 3 </label> </div> ';
			
			listaProcedimentos.innerHTML += cabecalho + corpo + rodape;
			
			
			$(document).ready(function(){
				$('select').formSelect();
			});	
			
			},	
		seDerErro);
	});
}

function montaComboProcedimento4() {
	banco.transaction(function (tx) {
		tx.executeSql('select * from TProcedimento ',
		[],
		function (tx, results) {
			var tamanho = results.rows.length;
			var listaProcedimentos = document.getElementById('listaProcedimentos4');
			
			listaProcedimentos.innerHTML = " ";
			
			var corpo;
			var i;
			var item = null;
	
			cabecalho = '<div class="input-field col s3">'+
			            
						'<select class="uppercase" id="comboProcedimentos4" name="comboProcedimentos4"> ';
	
							
			for(i=0; i < tamanho; i++) {
				item = results.rows.item(i);
				
				
			corpo =  corpo + ' <option value="' + item['IdProcedimento'] + '">' + item['Descricao'] + ' </option> ';
					
			}
			
			rodape = '   </select> <label for="comboProcedimentos"> Procedimento 4 </label> </div> ';
			
			listaProcedimentos.innerHTML += cabecalho + corpo + rodape;
			
			
			$(document).ready(function(){
				$('select').formSelect();
			});	
			
			},	
		seDerErro);
	});
}


function formataData(data){
	//2017-06-15
	
	var xdata = data;
	
	var ano = xdata.substring(0, [4]);
	var mes = xdata.substring(6, [7]);
	var dia = xdata.substring(8, [10]);
	
	if (dia.length==1) {
		dia = '0'+dia;		
	}
	if (mes.length==1) {
		mes = '0'+mes;		
	}
	
	var xdata = dia+'/'+mes+'/'+ano;
	
	return xdata;

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
						'<select onchange="montaComboAluno()" class="uppercase" id="comboTurma" name="comboTurma"> ';
	
							
			for(i=0; i < tamanho; i++) {
				item = results.rows.item(i);
				
				
			corpo =  corpo + ' <option value="' + item['IdTurma'] + '">' + item['Descricao'] + ' </option> ';
					
			}
			
			rodape = ' </select>  <label for="comboTurma"> Turma </label> </div> ';
			
			listaTurmas.innerHTML += cabecalho + corpo + rodape;
			
			
			$(document).ready(function(){
				$('select').formSelect();
			});	
			
			montaComboAluno();
			
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