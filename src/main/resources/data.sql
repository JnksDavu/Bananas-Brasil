-- 1. Criar uma tabela temporária para armazenar os dados de `pedidos`
CREATE TEMPORARY TABLE temp_pedidos AS
SELECT * FROM pedidos;

-- 2. Inserir os dados de `pedidos` na tabela temporária
INSERT INTO temp_pedidos
SELECT * FROM pedidos;

-- 3. Deletar os registros da tabela de `pedidos`
DELETE FROM pedidos;

-- 4. Deletar os registros da tabela de `produtos`
DELETE FROM produtos;

-- 5. Reinicializar a tabela de `produtos` com novos registros
CREATE SEQUENCE IF NOT EXISTS produto_sequence START WITH 1 INCREMENT BY 1;

INSERT INTO produtos (id, nome_produto, descricao_produto, valor_produto, uni_medida, categoria, avaliacao, img, descricao_detalhada) 
VALUES 
(1, 'Bala de Banana', 'Balas feitas com banana natural', 12.00, 'KG', 'Balas', 4, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbvhkpWlBJ-YIjisz1GiMNgjw1MEkTaxgwLg&s', ''),
(2, 'Cachaça de Banana', 'Cachaça artesanal de banana', 45.00, 'LT', 'Doces', 5, 'https://cachacarianacional.vteximg.com.br/arquivos/ids/168447-1000-1000/bebida-mista-de-cachaca-rainha-da-cana-com-banana-700ml-00126_1.jpg?v=638187982504200000', ''),
(3, 'Tablete de Banana', 'Tablete nutritivo de banana', 5.00, 'UN', 'Bombons', 4, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoNwNetTQMVlFhZqmRRYs-Cgl4GUvxdRykpA&s', ''),
(4, 'Geléia de Banana', 'Geléia caseira de banana', 10.00, 'PT', 'Doces', 4, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsjjy0L3mwvsdlE7G5D-cc-zp1z0T_qpNw_392ZBLmzcqCeS-YEHtSlL7BYFOENNoFiSk&usqp=CAU', ''),
(5, 'Sorvete de Banana', 'Sorvete cremoso de banana', 25.00, 'LT', 'Doces', 5, 'https://www.riosoftice.com.br/wp-content/uploads/2023/01/Sorvete-de-Banana-com-Chocolate-YAMO-Apresentacao.jpg', ''),
(6, 'Biscoito de Banana', 'Biscoito crocante de banana', 15.00, 'KG', 'Doces', 4, 'https://renata.com.br/images/produtos/102/renata-imagem-produtos-biscoito-renata-integrale-aveia-mel-e-banana-share.jpg', ''),
(7, 'Shake de Banana', 'Shake proteico de banana', 25.00, 'LT', 'Proteinas', 5, 'https://www.bonde.com.br/api/images/proxy?quality=100&src=https://s3.amazonaws.com/producao.spayce.com.br/1634914551072_smoothie.jpg', ''),
(8, 'Fudge de Banana', 'Fudge cremoso de banana', 18.00, 'PT', 'Doces', 4, 'https://www.inspirationalmomma.com/wp-content/uploads/2022/12/Banana-Fudge-1200x1200-1-720x540.jpg', ''),
(9, 'Smoothie de Banana', 'Smoothie de banana natural', 15.00, 'LT', 'Doces', 5, 'https://i.panelinha.com.br/i1/228-q-7995-smoothie-de-manga-e-banana-com-iogurte.webp', ''),
(10, 'Bombom de Banana', 'Bombom recheado com banana', 12.00, 'UN', 'Bombons', 5, 'https://cooknenjoy.com/wp-content/uploads/2022/03/Bombom-Caribe-01-1920x1442.jpg', ''),
(11, 'Muffin de Banana', 'Muffin fofo de banana', 5.00, 'UN', 'Doces', 5, 'https://www.adrianalauffer.com.br/wp-content/uploads/2020/03/receita-de-muffin-de-banana-e-aveia.png', ''),
(12, 'Pudim de Banana', 'Pudim cremoso de banana', 18.00, 'PT', 'Doces', 5, 'https://www.pngitem.com/pimgs/m/252-2528955_banana-pudding-hd-png-download.png', ''),
(13, 'Granola de Banana', 'Granola crocante com pedaços de banana', 10.00, 'PT', 'Doces', 5, 'https://www.saobraz.com.br/files/product/16817626150094-produto1.png', ''),
(14, 'Mostarda de Banana', 'Mostarda cremosa com um toque de banana', 15.00, 'PT', 'Doces', 5, 'https://cachacarianacional.vteximg.com.br/arquivos/ids/168297-1000-1000/mostarda-c-banana-caramelada-milagre-de-minas-220g-mbc-061895_1.jpg?v=638140755418900000', '');

-- 6. Opcional: Restaurar os dados de `pedidos` da tabela temporária para a tabela original
INSERT INTO pedidos (id, cliente_id, produto_id, quantidade, valor_unitario, valor_total, data_pedido)
SELECT DISTINCT id, cliente_id, produto_id, quantidade, valor_unitario, valor_total, data_pedido
FROM temp_pedidos
WHERE id NOT IN (SELECT id FROM pedidos);

-- Deletar a tabela temporária
DROP TABLE temp_pedidos;
