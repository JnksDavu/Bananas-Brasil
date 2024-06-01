package com.YellowExpress.Yellowzin.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

public class LoginController {
    @GetMapping("/home")
    public String loginPage() {
        return "login"; // nome do arquivo (login.html)
    }
    
}
