// Algoritmo de pattern matching ingênuo com contadores de iterações e instruções
public class Enunciado1_paulo {
    static long iteracoes = 0;
    static long instrucoes = 0;

    // Algoritmo de força bruta (ingênuo) para casamento de padrões
    // Complexidade no pior caso: O(n * m), onde n = tamanho do texto, m = tamanho do padrão
    // No pior caso, para cada posição do texto, pode ser necessário comparar todos os caracteres do padrão
    // Exemplo de pior caso: texto = "AAAAAAAAAA...A" (n vezes), padrão = "AAAAAB" (m vezes)
    // Para cada posição, quase todos os caracteres do padrão coincidem, exceto o último, causando máximo de comparações
    // Portanto, o número total de comparações pode chegar a (n - m + 1) * m
    // Resposta: Complexidade no pior caso é O(n * m)
    // Retorna a posição da primeira ocorrência de pattern em text, ou -1 se não encontrar
    public static int indexOf(String text, String pattern) {
        int n = text.length();
        int m = pattern.length();
        instrucoes += 2; // para n e m
        for (int i = 0; i <= n - m; i++) {
            iteracoes++;
            int j = 0;
            instrucoes++;
            while (j < m && text.charAt(i + j) == pattern.charAt(j)) {
                iteracoes++;
                j++;
                instrucoes++;
            }
            if (j == m) {
                instrucoes++;
                return i;
            }
        }
        return -1;
    }

    public static void main(String[] args) {
        // Teste pequeno
        String s1 = "ABCDCBDCBDACBDABDCBADF";
        String s2 = "ADF";
        iteracoes = 0; instrucoes = 0;
        int pos = indexOf(s1, s2);
        System.out.println("Posição encontrada: " + pos);
        System.out.println("Iterações: " + iteracoes);
        System.out.println("Instruções: " + instrucoes);

        // Teste grande
        int N = 600_000;
        StringBuilder sb1 = new StringBuilder();
        for (int i = 0; i < N; i++) sb1.append('A');
        sb1.setCharAt(N-3, 'B'); sb1.setCharAt(N-2, 'C'); sb1.setCharAt(N-1, 'D');
        String big1 = sb1.toString();
        String big2 = "BCD";
        iteracoes = 0; instrucoes = 0;
        int pos2 = indexOf(big1, big2);
        System.out.println("\nTeste grande:");
        System.out.println("Posição encontrada: " + pos2);
        System.out.println("Iterações: " + iteracoes);
        System.out.println("Instruções: " + instrucoes);
    }
}
