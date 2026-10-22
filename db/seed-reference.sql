-- Registros de referência. Não são ofertas ou parceria comercial declarada.
INSERT INTO public.stores(id,slug,name,logo_alt,external_url,active) VALUES
('str_amazon','amazon','Amazon','Amazon','https://www.amazon.com.br/',true),
('str_mercado_livre','mercado-livre','Mercado Livre','Mercado Livre','https://www.mercadolivre.com.br/',true)
ON CONFLICT(id) DO NOTHING;

INSERT INTO public.categories(id,slug,label,description,icon_name,active) VALUES
('eletronicos','eletronicos','Eletrônicos','Fones, gadgets e acessórios eletrônicos.','smartphone',true),
('casa','casa-e-decoracao','Casa e decoração','Eletrodomésticos e itens para casa.','home',true),
('beleza','beleza-e-cuidados','Beleza e cuidados','Produtos de autocuidado.','sparkles',true),
('moda','moda','Moda','Roupas, calçados e acessórios.','shirt',true),
('informatica','informatica','Informática','Notebooks, periféricos e informática.','laptop',true),
('acessorios','acessorios','Acessórios','Relógios, bolsas e complementos.','watch',true)
ON CONFLICT(id) DO NOTHING;
