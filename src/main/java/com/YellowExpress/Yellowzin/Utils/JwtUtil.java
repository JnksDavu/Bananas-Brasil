package com.YellowExpress.Yellowzin.Utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.util.Date;

public class JwtUtil {

    private static final String SECRET_KEY = "your_super_secret_key_your_super_secret_key"; // Deve ter pelo menos 256 bits de comprimento
    private static final SecretKey KEY = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    private static final int EXPIRATION_TIME = 1000 * 60 * 60; // 1 hora

    public static String generateToken(String usuario) {
        return Jwts.builder()
                .setSubject(usuario)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(KEY, SignatureAlgorithm.HS256)
                .compact();
    }

    public static Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public static boolean validateToken(String token, String usuario) {
        Claims claims = getClaims(token);
        return claims.getSubject().equals(usuario) && !isTokenExpired(token);
    }

    public static boolean isTokenExpired(String token) {
        Claims claims = getClaims(token);
        return claims.getExpiration().before(new Date());
    }

    public static String getUsuarioFromToken(String token) {
        Claims claims = getClaims(token);
        return claims.getSubject();
    }
}
