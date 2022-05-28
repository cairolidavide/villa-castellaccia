package com.digitazon.Villacastellaccia.models.utilities;

public class Utility {
    public static char[] BADSYMBOL = new char[]{'|', '\'', '\"', '\\', '%', '&', '$', '£', '!', '/', '(', ')',
            '=', '^', '+', '*', '?', ':', ';', ',','°', '#', '§', 'ò', 'à', 'ç','é', 'é', 'ù'};

    public static boolean isEmailValid(String email) {
        if (email.contains("@")) {
            int badSymbolFound = 0;
            for (char character : email.toCharArray()) {
                for (char symbol : BADSYMBOL) {
                    if (character == symbol) {
                        badSymbolFound = badSymbolFound + 1;
                    }
                }
            }
            if (badSymbolFound > 0) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }
}
