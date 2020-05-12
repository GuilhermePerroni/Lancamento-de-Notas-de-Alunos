var banco; //global
var numeroTurma;


function criarAbrirBanco() {
	banco = openDatabase('ProClin','1.0','Sistema de Proteses Dentarias', 2 * 1024 * 1024);
	//status.innerHTML = 'Banco Banco Criado e Aberto';
	
	/*alert('ok, Banco Criado e Aberto!');*/
	
	criarTabelas();
	
	
}
	
function seDerErro(tx, error) {
	alert('Deu Erro: '+ error.message);			
}

function criarTabelas() {
	banco.transaction(function (tx) {
		//tx.executeSql('drop table TTurma',
		tx.executeSql('create table if not exists TTurma (IdTurma int unique, Descricao text, Ano int)',
		[],
		function (tx) {/*alert('Tabela Tipos de Serviço Criou Certo')*/; mostrarTurma()},
		seDerErro);
	});
}


function validou() {
	if (document.getElementById('descricaoTurma').value == "") {
		var $toastContent = $('<span>Preencha o Campo Nome!</span>');
        Materialize.toast($toastContent, 5000);
		return false;			
	} else {
		return true;	
	}
}

//TipoServico
function inserirTurma() {
	var descricao = document.getElementById('descricaoTurma');
	novoIdTurma();
	
	if (validou()) {
	
		banco.transaction(function (tx) {
			var codigo    = document.getElementById('idTurma').value;
			var descricao = document.getElementById('descricaoTurma').value;
			var Ano = document.getElementById('Ano').value;
		    descricao = descricao.toUpperCase();
			
			tx.executeSql('insert into TTurma (IdTurma, Descricao, Ano) values (?,?,?)',
			[codigo, descricao, Ano],
			
			function (tx) {/*alert('Registro Inserido com sucesso'); mostrarDentistas()*/; 
				mostrarTurma(); 	
				
			},
			seDerErro);
		});
		
	}
	
}

function novoIdTurma() {
	banco.transaction(function (tx) {
		var codigo    = document.getElementById('idTurma');
	
	    texto = 'select MAX(IdTurma) Id from TTurma'
	
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


function mostrarTurma() {
	banco.transaction(function (tx) {
		tx.executeSql('select * from TTurma ',
		[],
		function (tx, results) {
			var tamanho = results.rows.length;
			var listaTurma = document.getElementById('listaTurma');
			
			listaTurma.innerHTML = "---";
			novoIdTurma();
			
			var i;
			var item = null;
			
			document.getElementById('descricaoTurma').value = "";
				
			var cabecalho = "";
			var linhas = "";
			var rodape = "";
			
			cabecalho = ' <table class="bordered striped highlight">                    ' +
			            ' <tr>                                  ' + 
						'	<th class="">Nº</th>         ' +
						'	<th class="" >Turma</th>        ' +
						'	<th class="">Ano</th>        ' +
						' </tr>                                 ';
			rodape = '</table>';
			
						
			for(i=0; i < tamanho; i++) {
				item = results.rows.item(i);
				
				
				//texto = ' <div class="paragrafo" onclick="alterarTurma('+item['IdTurma']+')"> <b>Nº</b> : ' + item['IdTurma'] + '       |     <b>Turma :</b> ' + item['Descricao']+' </div> <br>'
				
				
				linhas = linhas + '<tr onclick="alterarTurma('+item['IdTurma']+')" >' +
							  '<td class="">' + item['IdTurma'] +' </td>    ' +
							  '<td class="">' + item['Descricao']       +' </td>    ' +
							  '<td class="">' + item['Ano']       +' </td>    ' +
							  
							  
							  
							  '</tr>                                                  ';
				
			}
			
			listaTurma.innerHTML += cabecalho + linhas + rodape; 
			
			},	
		seDerErro);
	});
}

function excluirTurma() {
	var IdTurma = document.getElementById('idTurma').value;
	banco.transaction(function (tx) {
	tx.executeSql(' delete from TTurma where IdTurma = ?', 
	[IdTurma], 
	function (tx, results) {
		mostrarTurma();
		novoIdTurma();
	}, 
		seDerErro);
	});
}

function atualizarTurma() {
	var IdTurma = document.getElementById('idTurma').value;
	var Descricao = document.getElementById('descricaoTurma').value;
	var Ano = document.getElementById('Ano').value;
	Descricao = Descricao.toUpperCase();
	
	banco.transaction(function (tx) {
	tx.executeSql(' update TTurma set Descricao = ?, Ano = ? where IdTurma = ?', 
	[Descricao, Ano, IdTurma], 
	function (tx, results) {
		mostrarTurma();	
	}, 
		seDerErro);
	});
}

function alterarTurma(IdTurma) {	
	banco.transaction(function (tx) {
		tx.executeSql('select * from TTurma where IdTurma = ?',
		[IdTurma],
		function (tx, results) {
			var item = results.rows.item(0);
			
			var codigo    = document.getElementById('idTurma');
			var descricao = document.getElementById('descricaoTurma');
			var Ano = document.getElementById('Ano');
			
			codigo.value = IdTurma;
			descricao.value = item['Descricao'];
			Ano.value = item['Ano'];
		},	
		seDerErro);
	});
	
}
//TipoServico

