# README: Blokus Online Game

Αυτό το έργο αφορά την ανάπτυξη ενός online παιχνιδιού **Blokus** σύμφωνα με τις απαιτήσεις που έχουν καθοριστεί από την εργασία της πανεπιστημιακής μας ομάδας. Το παιχνίδι επιτρέπει στους χρήστες να παίξουν έναντι άλλου μέσω ενός GUI (Graphical User Interface) με την υποστήριξη Web API και χρήσης τεχνολογιών όπως PHP, MySQL, AJAX και jQuery.

## 1. Εισαγωγή

Το παιχνίδι Blokus είναι ένα στρατηγικό επιτραπέζιο παιχνίδι όπου δύο παίκτες προσπαθούν να τοποθετήσουν τα κομμάτια τους στο ταμπλό με συγκεκριμένους κανόνες. Σε αυτό το έργο, η εφαρμογή επιτρέπει τη διαχείριση ενός παιχνιδιού δύο παικτών μέσω διαδικτύου. 

Οι παίκτες συνδέονται στην πλατφόρμα μέσω μιας διαδικασίας αυθεντικοποίησης, μπορούν να παίξουν το παιχνίδι μέσω ενός γραφικού περιβάλλοντος (GUI), και όλα τα δεδομένα του παιχνιδιού αποθηκεύονται σε βάση δεδομένων MySQL.

## 2. Ομάδα

- **Konstantinos Dimitriou**
- **Alexandros Mavrotheris**
- **Stavros Ashikkalis**

## 3. Απαιτήσεις

### 3.1. Απαιτήσεις Παιχνιδιού
- **Αρχικοποίηση Σύνδεσης - Authentication:** Η εφαρμογή πρέπει να υποστηρίζει την αρχικοποίηση σύνδεσης, ακόμα και χωρίς password (π.χ., μέσω ενός απλού μοναδικού αναγνωριστικού χρήστη).
- **Αναγνώριση Σειράς Παίκτη:** Το παιχνίδι πρέπει να αναγνωρίζει ποιος είναι ο επόμενος παίκτης.
- **Έλεγχος Κανόνων Παιχνιδιού:** Η εφαρμογή πρέπει να ελέγχει και να εφαρμόζει τους κανόνες του Blokus.
- **Αναγνώριση Deadlock:** Αν δεν υπάρχει διαθέσιμη κίνηση ή αν το παιχνίδι ολοκληρωθεί, η εφαρμογή πρέπει να το ανιχνεύει και να το αναφέρει στους παίκτες.
- **Χρήση JSON για τα Δεδομένα:** Όλα τα δεδομένα πρέπει να επικοινωνούν μέσω JSON (π.χ., για την ανταλλαγή δεδομένων μεταξύ frontend και backend).
- **Αποθήκευση Κατάστασης Παιχνιδιού σε MySQL:** Όλες οι ενέργειες και η κατάσταση του παιχνιδιού πρέπει να αποθηκεύονται σε βάση δεδομένων MySQL.

### 3.2. GUI & Λειτουργίες
- **Γραφική Εμφάνιση Board:** Το GUI πρέπει να εμφανίζει το ταμπλό του παιχνιδιού (σε μορφή κειμένου ή γραφικά, ανάλογα με τις απαιτήσεις).
- **Κίνηση Παίκτη μέσω Textarea/Input Text:** Οι εντολές για την κίνηση των κομματιών μπορούν να δίνονται μέσω ενός πεδίου κειμένου (textarea/input text).
- **Επιλογές CLI:** Το παιχνίδι θα υποστηρίζει επίσης την εκτέλεση εντολών μέσω CLI (π.χ., με χρήση `curl`, `wget`, ή `Postman` για API αιτήματα).
  
### 3.3. Προαιρετικές Δυνατότητες για Bonus Βαθμούς
- **Authentication μέσω Apps:** Προσθήκη αυθεντικοποίησης μέσω εφαρμογών (π.χ., μέσω API).
- **Πολλά Σύγχρονα Boards:** Υποστήριξη περισσότερων από ένα boards για το ίδιο παιχνίδι.
- **Καταγραφή Score/Πόντων Παικτών:** Υλοποίηση scoreboard για την παρακολούθηση των πόντων των παικτών.
- **Έλεγχος Timeout - Ακύρωση Παίκτη:** Αν κάποιος παίκτης δεν κάνει κίνηση για αρκετό χρόνο, το παιχνίδι πρέπει να τον ακυρώνει.
- **Οποιεσδήποτε Άλλες Πρόσθετες Δυνατότητες:** Οποιαδήποτε άλλη λειτουργία ή δυνατότητα προτείνετε και υλοποιήσετε κατά τη διάρκεια του έργου.

## 4. Αρχιτεκτονική & Υλοποίηση

Η αρχιτεκτονική του έργου βασίζεται στη χρήση **PHP** για τον backend, **MySQL** για τη βάση δεδομένων, **AJAX** και **jQuery** για την επικοινωνία του frontend με τον server. Η εφαρμογή χρησιμοποιεί επίσης **JSON** για την ανταλλαγή δεδομένων μεταξύ frontend και backend.

### 4.1. Αρχιτεκτονική Web API
Η επικοινωνία μεταξύ του frontend και του backend γίνεται μέσω API κλήσεων με χρήση **AJAX**. Ο backend (PHP) θα χειρίζεται τα αιτήματα, και οι απαντήσεις θα είναι σε μορφή **JSON**.

### 4.2. Σύνδεση με MySQL
Η βάση δεδομένων MySQL θα αποθηκεύει:
- Στοιχεία χρηστών (π.χ., αναγνωριστικά χρηστών).
- Κατάσταση του παιχνιδιού (π.χ., ποιος παίζει, ποιο είναι το τρέχον board, πόντοι).
- Ιστορικό παιχνιδιών (π.χ., για στατιστικά και scoreboard).

### 4.3. Σύνδεση GUI και Λειτουργικότητα
Το GUI θα εμφανίζει το ταμπλό του παιχνιδιού και θα επιτρέπει στους χρήστες να εισάγουν τις εντολές για την κίνηση των κομματιών. Οι εντολές θα αποστέλλονται μέσω AJAX αιτημάτων στον server, και η κατάσταση του παιχνιδιού θα ενημερώνεται δυναμικά χωρίς την ανάγκη ανανέωσης της σελίδας.

## 5. Οδηγίες Εγκατάστασης

### 5.1. Απαιτήσεις
- PHP 7.4 ή μεγαλύτερη
- MySQL 5.7 ή μεγαλύτερη
- Web Server (π.χ., Apache)
- jQuery και AJAX υποστήριξη στο frontend

### 5.2. Εγκατάσταση
1. **Κλωνοποιήστε το έργο από το GitHub (ή κατεβάστε το zip αρχείο).**
   ```bash
   git clone https://github.com/iee-ihu-gr-course1941/ADISE24_DreamTeam.git