-- Insert Services from Original Site
-- Execute este SQL no Supabase para importar os serviços que já estavam no site

-- Massagens (8 serviços)
INSERT INTO services (name, description, price, category, duration, is_active, order_index, color) VALUES
('Massagem Tântrica', 'Uma massagem erótica que redistribui as energias sexuais do corpo, expandindo a sensibilidade e proporcionando vivências mais intensas. Estimula os canais sensoriais do corpo inteiro.', 150.00, 'massage', 90, true, 0, 'from-orange-500 to-red-600'),
('Massagem Body to Body', 'Uma massagem sensual de corpo inteiro onde a massagista utiliza o corpo nu para estimular o cliente. Desperta as zonas mais sensíveis através das curvas corporais.', 180.00, 'massage', 60, true, 1, 'from-pink-500 to-rose-600'),
('Massagem Lingam', 'Uma ode ao sexo masculino. Feita apenas para homens que queiram atingir a plenitude de autoconhecimento da sua sexualidade.', 140.00, 'massage', 75, true, 2, 'from-blue-500 to-cyan-600'),
('Massagem Yoni', 'Destinada a senhoras que queiram explorar o conhecimento do seu corpo, novas sensações de prazer ou desbloquear barreiras à sua sexualidade.', 140.00, 'massage', 75, true, 3, 'from-purple-500 to-violet-600'),
('Massagem de Relaxamento', 'Movimentos firmes e suaves sobre o corpo, proporcionando relaxamento muscular, melhoria da circulação sanguínea e alívio de tensões.', 100.00, 'massage', 60, true, 4, 'from-green-500 to-emerald-600'),
('Massagem para Casais', 'Uma massagem a dois que tem por objetivo aproximar o casal, despertando-o para o prazer partilhado e novas experiências.', 280.00, 'massage', 90, true, 5, 'from-fuchsia-500 to-pink-600'),
('Massagem Nuru', 'Utiliza gel Nuru com algas marinhas, permitindo um deslizamento perfeito e interação única dos corpos.', 200.00, 'massage', 75, true, 6, 'from-teal-500 to-cyan-600'),
('Massagem Desportiva', 'Promove o bem-estar aliviando desconfortos das regiões mais afetadas com dores musculares.', 110.00, 'massage', 60, true, 7, 'from-amber-500 to-orange-600');

-- Terapias (5 serviços)
INSERT INTO services (name, description, price, category, duration, is_active, order_index, color) VALUES
('Terapia Holística', 'Abordagem integrada que considera o ser humano como um todo - corpo, mente e espírito.', 120.00, 'therapy', 90, true, 8, 'from-indigo-500 to-purple-600'),
('Reflexologia', 'Estimulação de pontos reflexos nos pés para promover equilíbrio energético.', 90.00, 'therapy', 45, true, 9, 'from-rose-500 to-pink-600'),
('Reiki', 'Terapia energética japonesa para harmonização dos chakras e bem-estar.', 80.00, 'therapy', 60, true, 10, 'from-violet-500 to-purple-600'),
('Shiatsu', 'Massagem japonesa através de pressões em pontos específicos do corpo.', 110.00, 'therapy', 75, true, 11, 'from-emerald-500 to-teal-600'),
('Massoterapia', 'Tratamento terapêutico completo com técnicas variadas de massagem.', 130.00, 'therapy', 90, true, 12, 'from-cyan-500 to-blue-600');
