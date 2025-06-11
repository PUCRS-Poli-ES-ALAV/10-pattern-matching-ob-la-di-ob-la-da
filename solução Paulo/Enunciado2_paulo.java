// Algoritmo de Rabin-Karp para casamento de padrões com contadores de iterações e instruções
// Complexidade no pior caso: O(n * m), onde n = tamanho do texto, m = tamanho do padrão
// No caso médio, espera-se O(n + m) com bom hash e poucas colisões
// Utiliza algoritmo de Horner para hash
public class Enunciado2_paulo {
    static long iteracoes = 0;
    static long instrucoes = 0;
    static final int R = 256; // Tamanho do alfabeto ASCII
    static final int Q = 2147483647; // Primo grande (maior int positivo)

    // Calcula o hash de uma string s[0..M-1] usando Horner
    public static long hash(String s, int M) {
        long h = 0;
        for (int j = 0; j < M; j++) {
            iteracoes++;
            h = (h * R + s.charAt(j)) % Q;
            instrucoes += 3;
        }
        return h;
    }

    // Retorna a posição da primeira ocorrência de pattern em text, ou -1 se não encontrar
    public static int rabinKarp(String text, String pattern) {
        int N = text.length();
        int M = pattern.length();
        instrucoes += 2;
        long patHash = hash(pattern, M);
        instrucoes++;
        for (int i = 0; i <= N - M; i++) {
            iteracoes++;
            long txtHash = hash(text.substring(i, i + M), M);
            instrucoes++;
            if (patHash == txtHash) {
                instrucoes++;
                // Verificação extra para evitar colisão
                if (text.substring(i, i + M).equals(pattern)) {
                    instrucoes++;
                    return i;
                }
            }
        }
        return -1;
    }

    public static void main(String[] args) {
        // Teste pequeno
        String s1 = "ABCDCBDCBDACBDABDCBADF";
        String s2 = "ADF";
        iteracoes = 0; instrucoes = 0;
        int pos = rabinKarp(s1, s2);
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
        int pos2 = rabinKarp(big1, big2);
        System.out.println("\nTeste grande:");
        System.out.println("Posição encontrada: " + pos2);
        System.out.println("Iterações: " + iteracoes);
        System.out.println("Instruções: " + instrucoes);
    }
}
