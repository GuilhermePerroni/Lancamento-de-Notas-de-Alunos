var banco; //global
var numeroaluno;


function criarAbrirBanco() {
	banco = openDatabase('ProClin','1.0','Sistema de Proteses Dentarias', 2 * 1024 * 1024);
	//status.innerHTML = 'Banco Banco Criado e Aberto';
	
	/*alert('ok, Banco Criado e Aberto!');*/
	
	criarTabelas();
	
	abreLancamento();
	
	montaComboTurma();
	
}
	
function seDerErro(tx, error) {
	alert('Deu Erro: '+ error.message);			
}

function criarTabelas() {
	banco.transaction(function (tx) {
		//tx.executeSql('drop table TAluno',
		tx.executeSql('create table if not exists TAluno (IdAluno int unique, Descricao text, box int, turma int)',
		[],
		function (tx) {/*alert('Tabela Tipos de Serviço Criou Certo')*/; mostrarAluno()},
		seDerErro);
	});
}


function validou() {
	if (document.getElementById('descricaoAluno').value == "") {
		var $toastContent = $('<span>Preencha o Campo Nome!</span>');
        Materialize.toast($toastContent, 5000);
		return false;			
	} else {
		return true;	
	}
}

//TipoServico
function inserirAluno() {
	var descricao = document.getElementById('descricaoAluno');
	novoIdAluno();
	
	if (validou()) {
	
		banco.transaction(function (tx) {
			var codigo    = document.getElementById('idAluno').value;
			var descricao = document.getElementById('descricaoAluno').value;
			var box = document.getElementById('box').value;
			var turma = document.getElementById('comboTurma').selectedIndex  + 1;
			
			
		    descricao = descricao.toUpperCase();
			
			tx.executeSql('insert into TAluno (IdAluno, Descricao, box, turma) values (?,?,?,?)',
			[codigo, descricao, box, turma],
			
			function (tx) {/*alert('Registro Inserido com sucesso'); mostrarDentistas()*/; 
				mostrarAluno(); 	
				
			},
			seDerErro);
		});
		
	}
	
}

function novoIdAluno() {
	banco.transaction(function (tx) {
		var codigo    = document.getElementById('idAluno');
	
	    texto = 'select MAX(IdAluno) Id from TAluno'
	
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
	//<a href="..\ProClin.html" class="inicio">Início</a>
	
	//numeroaluno = document.getElementById('idAluno').value;
	
	//window.open('../lancamentos/lancamentos.html');
	
	var modalAluno = document.getElementById('modalAluno');
	
	listaAluno.innerHTML = '';
	
	var texto = '';
	
	texto = '<!-- Modal Trigger -->																'+					
  			//'<a class="waves-effect waves-light btn modal-trigger" href="#modal1">Modal</a>     '+
  			'                                                                                   '+
  			'<!-- Modal Structure -->                                                           '+
  			'<div id="modal1" class="modal modal-fixed-footer">                                                    '+
  			'  <div class="modal-content">                                                      '+
  			'    <h4>Lançamento de Procedimento e Nota</h4>                                                          '+
  			'    <p>Preencha os campos abaixo:</p>                                                         '+
			
			'		                                                                               '+
			'		<div class="input-field col s12">                                              '+
			'			<i class="material-icons prefix">location_city</i>                         '+
			'			<input class="uppercase" type="text" id="nomePaciente" placeholder="">	'+
			'			<label for="nomePaciente"> Paciente </label>                            '+
			'		</div>                                                                         '+
			'	                                                                                   '+
			'		<div class="input-field col s12">                                              '+
			'			<i class="material-icons prefix">location_city</i>                         '+
			'			<input type="text" id="procedimento" placeholder="">	                               '+
			'			<label for="procedimento"> Procedimento </label>                                             '+
			'		</div>                                                                         '+
			
			'		<div class="input-field col s12">                                              '+
			'			<i class="material-icons prefix">location_city</i>                         '+
			'			<input type="text" id="nota" placeholder="">	                               '+
			'			<label for="nota"> Nota </label>                                             '+
			'		</div>                                                                         '+
			'                                                                             '+
			
			'                                                                             '+
			'                                                                             '+
			'                                                                             '+
			'                                                                             '+
			'                                                                             '+
			
			
			
  			'  </div>                                                                           '+
  			'  <div class="modal-footer">                                                       '+
  			'    <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>   '+
  			'  </div>                                                                           '+
  			'</div>                                                                             ';
	
	
	
	
	modalAluno.innerHTML = texto;
	
	$(document).ready(function(){
		$('.modal').modal();
	});
	
	 
	
}

function mostrarAluno() {
	banco.transaction(function (tx) {
		tx.executeSql('select A.*, T.Descricao as NomeTurma from TAluno as A left join TTurma as T on (A.turma = T.IdTurma)',
		[],
		function (tx, results) {
			var tamanho = results.rows.length;
			var listaAluno = document.getElementById('listaAluno');
			
			listaAluno.innerHTML = "--";
			novoIdAluno();
			
			var i;
			var item = null;
			
			document.getElementById('descricaoAluno').value = "";
				
			var cabecalho = "";
			var linhas = "";
			var rodape = "";
			
			cabecalho = ' <table class="bordered striped highlight">                    ' +
			            ' <tr>                                  ' + 
						'	<th class="">Nº</th>         ' +
						'	<th class="" >Aluno</th>        ' +
						'	<th class="">Box</th>        ' +
						'	<th class="">Turma</th>        ' +
						'	<th class="">Lancar Nota</th>        ' +
						' </tr>                                 ';
			rodape = '</table>';
			
						
			for(i=0; i < tamanho; i++) {
				item = results.rows.item(i);
				
				
				//texto = ' <div class="paragrafo" onclick="alterarAluno('+item['IdAluno']+')"> <b>Nº</b> : ' + item['IdAluno'] + '       |     <b>Aluno :</b> ' + item['Descricao']+' </div> <br>'
				
				
				linhas = linhas + '<tr onclick="alterarAluno('+item['IdAluno']+')" >' +
							  '<td class="">' + item['IdAluno'] +' </td>    ' +
							  '<td class="">' + item['Descricao']       +' </td>    ' +
							  '<td class="">' + item['box']       +' </td>    ' +
							  '<td class="">' + item['NomeTurma']       +' </td>    ' +
							  
							  '<td class=""> <a  class="waves-effect waves-light btn modal-trigger" href="#modal1">Modal</a>  </td>    ' +
							 
							 
							 
							 // '<td class=""> <button class="waves-effect waves-light btn" onclick="abreLancamento();"> <i class="material-icons ">create</i> </button> </td>    ' +
							 
							  
							  
							  '</tr>                                                  ';
				
			}
			
			listaAluno.innerHTML += cabecalho + linhas + rodape; 
			
			},	
		seDerErro);
	});
}

function excluirAluno() {
	var IdAluno = document.getElementById('idAluno').value;
	banco.transaction(function (tx) {
	tx.executeSql(' delete from TAluno where IdAluno = ?', 
	[IdAluno], 
	function (tx, results) {
		mostrarAluno();
		novoIdAluno();
	}, 
		seDerErro);
	});
}

function atualizarAluno() {
	var IdAluno = document.getElementById('idAluno').value;
	var Descricao = document.getElementById('descricaoAluno').value;
	var box = document.getElementById('box').value;
	var turma = document.getElementById('comboTurma').selectedIndex    + 1;
			
	
	Descricao = Descricao.toUpperCase();
	
	banco.transaction(function (tx) {
	tx.executeSql(' update TAluno set Descricao = ?, box = ?, turma = ? where IdAluno = ?', 
	[Descricao, box,turma, IdAluno], 
	function (tx, results) {
		mostrarAluno();	
	}, 
		seDerErro);
	});
}

function alterarAluno(IdAluno) {	
	banco.transaction(function (tx) {
		tx.executeSql('select * from TAluno where IdAluno = ?',
		[IdAluno],
		function (tx, results) {
			var item = results.rows.item(0);
			
			var codigo    = document.getElementById('idAluno');
			
			descricao = document.getElementById('descricaoAluno');
			
			var box = document.getElementById('box');
			var turma = document.getElementById('comboTurma');
			
			
			//var turma = document.getElementById('comboTurma').selectedIndex    + 1;
			
			
			codigo.value = IdAluno;
			descricao.value = item['Descricao'];
			box.value = item['box'];
			turma.selectedIndex = item['turma']-1;
			
			$(document).ready(function(){
				$('select').formSelect();
			});	
			
		},	
		seDerErro);
	});
	
}
//TipoServico



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
	
			cabecalho = '<div class="input-field col s12">'+
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