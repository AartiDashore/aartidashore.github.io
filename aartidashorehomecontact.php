<?php
/*
// Check that all required fields have been filled out
if (!isset($_POST['name']) ||
    !isset($_POST['email']) ||
    !isset($_POST['subject']) ||
    !isset($_POST['message'])) {
    // If any required fields are missing, redirect back to the form
    header('Location: aartidashorehome.html');
    exit;
}

// Validate the email address
$email = $_POST['email'];
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    // If the email address is invalid, redirect back to the form
    header('Location: aartidashorehome.html');
    exit;
}

// Set up the email
$to = 'rt.d2710@gmail.com';
$subject = $_POST['subject'] . ' ' . $_POST['name'];
$message = $_POST['message'];
$headers = 'From: ' . $email . "\r\n" .
           'Reply-To: ' . $email . "\r\n" .
           'X-Mailer: PHP/' . phpversion();

// Send the email
mail($to, $subject, $message, $headers);

// Redirect to the thank-you page
header('Location: thankyou.html');
exit;

?>*/



<?php
if (isset($_POST['email'])) {

    // EDIT THE 2 LINES BELOW AS REQUIRED
    $email_to = "rt.d2710@gmail.com";
    $email_subject = "Website Contact Form:  ".$_POST['subject'];

    function died($error) {
        // your error code can go here
        echo "We are very sorry, but there were error(s) found with the form you submitted. ";
        echo "These errors appear below.<br /><br />";
        echo $error."<br /><br />";
        echo "Please go back and fix these errors.<br /><br />";
        die();
    }

    // validation expected data exists
    if(!isset($_POST['fullname']) ||
        !isset($_POST['email']) ||
        !isset($_POST['subject']) ||
        !isset($_POST['message'])) {
        died('We are sorry, but there appears to be a problem with the form you submitted.');
    }

    $fullname = $_POST['fullname']; // required
    $email_from = $_POST['email']; // required
    $subject = $_POST['subject']; // not required
    $message = $_POST['message']; // required

    $error_message = "";
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';

    if(!preg_match($email_exp,$email_from)) {
        $error_message .= 'The Email Address you entered does not appear to be valid.<br />';
    }

    $string_exp = "/^[A-Za-z .'-]+$/";

    if(!preg_match($string_exp,$fullname)) {
       
        $error_message .= 'The Full Name you entered does not appear to be valid.<br />';
    }

    if(strlen($message) < 2) {
    $error_message .= 'The Message you entered do not appear to be valid.<br />';
    }

    if(strlen($error_message) > 0) {
    died($error_message);
    }

    $email_message = "Form details below.\n\n";

    function clean_string($string) {
    $bad = array("content-type","bcc:","to:","cc:","href");
    return str_replace($bad,"",$string);
    }

    $email_message .= "Full Name: ".clean_string($fullname)."\n";
    $email_message .= "Email: ".clean_string($email_from)."\n";
    $email_message .= "Subject: ".clean_string($subject)."\n";
    $email_message .= "Message: ".clean_string($message)."\n";

    // create email headers
    $headers = 'From: '.$email_from."\r\n".
    'Reply-To: '.$email_from."\r\n" .
    'X-Mailer: PHP/' . phpversion();
    @mail($email_to, $email_subject, $email_message, $headers);
    ?>
    
    <!-- include your success message below -->
    Thank you for contacting us. We will be in touch with you very soon.

    <?php
    }
    ?>


?>