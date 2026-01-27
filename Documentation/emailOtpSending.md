Perfect 👍
Now we’ll add **OTP email sending functionality** using **Spring Boot + JavaMailSender**, in a **clean, production-ready, interview-safe way**.

I’ll explain:

1. What is needed
2. Configuration
3. Email service
4. Integration with forgot-password flow

---

# ✅ What We Are Building

When user calls:

```
POST /users/forgot-password
```

➡️ Backend will:

* Generate OTP
* Save OTP in DB
* **Send OTP to user’s email**

---

# 1️⃣ Add Mail Dependency (Maven)

Add this in your `pom.xml`:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-mail</artifactId>
</dependency>
```

📌 Restart application after adding.

---

# 2️⃣ Email Configuration (`application.properties`)

Use **Gmail SMTP** (most common for testing).

```properties
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your_email@gmail.com
spring.mail.password=your_app_password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```

### 🔐 IMPORTANT (Very Important)

* **DO NOT use your normal Gmail password**
* Generate **App Password** from Google Account → Security → App passwords

🧠 Interview line:

> SMTP credentials should never be hardcoded; they should be externalized.

---

# 3️⃣ Create Email Service

📁 `com.backend.common.service`

```java
package com.backend.common.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOtpEmail(String toEmail, String otp) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Password Reset OTP");
        message.setText(
                "Your OTP for password reset is: " + otp +
                "\n\nThis OTP is valid for 10 minutes."
        );

        mailSender.send(message);
    }
}
```

---

## 🔍 Explanation (Interview-Ready)

| Line                | Purpose                      |
| ------------------- | ---------------------------- |
| `JavaMailSender`    | Spring abstraction over SMTP |
| `SimpleMailMessage` | Simple text email            |
| `setTo()`           | Recipient                    |
| `setSubject()`      | Email subject                |
| `send()`            | Sends email                  |

---

# 4️⃣ Integrate Email in Forgot Password Logic

### Update `UserServiceImpl`

Inject `EmailService`:

```java
@Autowired
private EmailService emailService;
```

---

### Update `forgotPassword()` method

```java
@Override
public void forgotPassword(String email) {

    User user = userRepo.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

    // Generate 5-digit OTP
    int otpValue = new SecureRandom().nextInt(90000) + 10000;
    String otp = String.valueOf(otpValue);

    PasswordResetOtp resetOtp = new PasswordResetOtp();
    resetOtp.setEmail(email);
    resetOtp.setOtp(otp);
    resetOtp.setExpiryTime(LocalDateTime.now().plusMinutes(10));
    resetOtp.setUsed(false);

    otpRepo.save(resetOtp);

    // ✅ Send OTP via email
    emailService.sendOtpEmail(email, otp);
}
```

---

# 5️⃣ API Flow (End-to-End)

### Request

```
POST /users/forgot-password
{
  "email": "test@gmail.com"
}
```

### Backend Actions

✔ User validated
✔ OTP generated
✔ OTP saved in DB
✔ **OTP emailed to user**

---

# 🧪 Sample Email Content

```
Subject: Password Reset OTP

Your OTP for password reset is: 48291

This OTP is valid for 10 minutes.
```

---

# 🧠 Interview One-Liners (VERY IMPORTANT)

> **OTP is sent via email using SMTP with JavaMailSender after being securely generated and stored with an expiry time.**

> **Email sending logic is kept in a separate service to follow single responsibility principle.**

---

# ❌ Common Mistakes (Avoid These)

| ❌ Mistake                       | Why                    |
| ------------------------------- | ---------------------- |
| Sending OTP without saving      | No verification        |
| Hardcoding email credentials    | Security risk          |
| Using `Math.random()`           | Predictable            |
| Sending password instead of OTP | Critical vulnerability |

---

# ✅ What You Have Now

✔ Forgot password API
✔ OTP generation
✔ OTP DB persistence
✔ **OTP email delivery**
✔ Clean architecture

---

## 🔥 Next Enhancements (Tell me what you want)

* Hash OTP before saving
* Email HTML template
* Rate-limit OTP requests
* Resend OTP logic
* Cleanup expired OTPs

Just tell me 👍
