package com.test.project.dto;

public class AuthResponse {
    private String message;
    private int coins;
    private long userid;

    public AuthResponse(long userid,String message, int coins) {
        this.message = message;
        this.coins = coins;
        this.userid=userid;
    }

    public AuthResponse(String message, int coins) {
        this.message = message;
        this.coins = coins;
    }

    // getters & setters
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public int getCoins() { return coins; }
    public void setCoins(int coins) { this.coins = coins; }

    public long getUserid() { return userid; }
    public void setUserid(long userid) { this.userid = userid; }
}
