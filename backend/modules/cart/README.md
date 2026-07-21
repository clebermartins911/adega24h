# Adega24hSystem - Módulo Cart

## Versão

1.0

## Objetivo

O módulo Cart é responsável pelo gerenciamento do carrinho de compra temporário.

Ele recebe produtos selecionados pelo cliente ou pelo PDV e controla:

- itens adicionados;
- quantidade;
- subtotal;
- valor total.

---

## Responsabilidades

O módulo Cart NÃO é responsável por:

- pagamento;
- estoque;
- cadastro de produtos;
- emissão de venda;
- impressão.

Essas funções pertencem a outros módulos.

---

## Fluxo

Cliente/PDV

↓

Cart

↓

Pagamento

↓

Venda

↓

Estoque

---

## Operações iniciais

### Adicionar produto

Entrada:

- produto_id
- nome
- preço
- quantidade

### Remover produto

Remove um item do carrinho.

### Alterar quantidade

Atualiza a quantidade de um produto.

### Listar carrinho

Retorna todos os itens.

### Calcular total

Calcula:

subtotal dos itens

-

total da compra

### Limpar carrinho

Remove todos os itens.

---

## Futuras integrações

- Leitor de código de barras
- QR Code
- Cliente mobile
- Autoatendimento
- Pagamento PIX
- Pagamento cartão
- Pagamento dinheiro com cálculo de troco
