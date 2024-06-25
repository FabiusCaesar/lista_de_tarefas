$(document).ready(function() {
    
    // Mostrar o formulário ao passar o mouse sobre o botão "Nova tarefa"
    $('#button-new').on('mouseover',function() {
        $('form').slideDown();
    })

    // Adicionar nova tarefa
    $('form').on('submit', function(e) {
        e.preventDefault();

        const novaTarefa = $('#nova-tarefa').val().trim(); // Remove espaços extras

        // Verificar se a tarefa já existe na lista
        let tarefaDuplicada = false;
        $('ul li').each(function() {
            if ($(this).text() === novaTarefa) {
                tarefaDuplicada = true;
                return false; // Sair do loop
            }
        });

        if (tarefaDuplicada) {
            // Exibir aviso e destacar input
            alert('Essa tarefa já existe na lista!');
            $('#nova-tarefa').addClass('duplicated');

            // Limpar a classe de duplicação ao modificar o texto
            $('#nova-tarefa').on('input', function() {
                const textoAtual = $(this).val().trim();
                let tarefaExiste = false;
                $('ul li').each(function() {
                    if ($(this).text() === textoAtual) {
                        tarefaExiste = true;
                        return false; // Sair do loop
                    }
                });

                if (!tarefaExiste) {
                    $(this).removeClass('duplicated');
                }
            });

        } else {
            // Adicionar a nova tarefa ao final da lista e limpar o campo de entrada
            const novaTarefaItem = $('<li></li>').text(novaTarefa);
            $('ul').append(novaTarefaItem);
            $('#nova-tarefa').val('');
            $('#nova-tarefa').removeClass('duplicated'); // Remover a classe de duplicação se existia
        }
    });
        
    // Esconder o formulário e limpar o campo ao clicar fora
    $(document).mouseup(function(e) {
        const container = $('form');
        const button = $('section button');
        
        // Verifica se o clique não foi dentro do formulário nem no botão
        if (!container.is(e.target) && container.has(e.target).length === 0 && !button.is(e.target)) {
            container.slideUp();
            $('#nova-tarefa').val('').removeClass('duplicated'); // Limpa o campo de entrada e a classe
        }
    });

    // Alternar a classe de texto riscado ao clicar na tarefa
    $(document).on('click', 'ul li', function() {
        $(this).toggleClass('completed');
    });
});