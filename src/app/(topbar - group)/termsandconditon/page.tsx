'use client';
import { Loader } from '@/app/Components/common/Loader';
import { useUpdateUserTracking } from '@/app/utils/api/user-api';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { axiosError } from '../../types/axiosTypes';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
const Page = () => {
  // Common CSS classes
  const router = useRouter();
  const [enableTermsCondition, setEnableTermsCondition] = useState(false);
  const sectionClass = 'mb-8 text-black';
  const headingClass = 'font-semibold text-base mb-4 text-black';
  const paragraphClass =
    'text-black mb-3 text-base font-normal leading-relaxed';
  const { mutate: updateUserTracking, isPending } = useUpdateUserTracking({
    onSuccess(data) {
      toast.success(data?.message);
      if (data?.data?.tracking) {
        const userInfo = data?.data?.tracking;
        Cookies.set('userInfo', JSON.stringify(userInfo), {
          path: '/',
          sameSite: 'Lax',
          secure: true,
        });
        router.push('/onboarding');
      }
    },
    onError(error: axiosError) {
      toast.error(
        error?.response?.data?.errors?.message ||
          error?.response?.data?.message ||
          'Failed to update user tracking'
      );
    },
  });

  const handleContinue = () => {
    if (!enableTermsCondition) {
      toast.warning('Please agree to the Terms & Conditions to continue');
      return;
    }
    updateUserTracking({
      termsAccepted: true,
    });
  };
  return (
    <div className='max-w-6xl mx-auto  bg-white text-black'>
      {isPending ? <Loader /> : null}
      <h1 className='text-2xl font-medium mb-6 text-center'>
        Terms and Conditions
      </h1>

      <p className={paragraphClass}>
        {`Please carefully read this Privacy Policy ( the “Policy”), which explains the categories of personal information that MiiGuru. ("we" "us" or "our") collects when you (the “User” or “You”), as the user of our MiiGuru through its web application (the “Application”), how that information is used, with whom it may be shared, and your privacy choices.·`}
      </p>

      {/* Section 1: Data Collection and Processing */}
      <div className={sectionClass}>
        <h2 className={headingClass}>
          1. Data Collection and Processing by MilGuru
        </h2>
        <p className={paragraphClass}>
          When the User uses our application or service, MiiGuru may collect and
          use personal data as follows:
        </p>
        <div className='mb-4'>
          <h3 className='font-semibold mb-2'>Personal data collected</h3>
          <p className={paragraphClass}>
            MiiGuru collects the following categories of personal data, which
            may be collected from you, through the collection forms in the
            ordering process or other processes.
          </p>
        </div>

        <div className={paragraphClass}>
          <h4 className='font-medium mb-2'>①Information you provide to us.</h4>
          <p className={paragraphClass}>
            We may ask that you provide certain information to us when you order
            the Application or contact us through the Application for
            information or support. This information may include your email
            address, account name, or other personal identifier, order
            information, purchase-token, the products you purchase, date and
            amount of the order, expires date,currency code,country code;
          </p>
        </div>

        <div className={paragraphClass}>
          <h4 className='font-medium mb-2'>
            ②Information we automatically collect when you visit our Website:
          </h4>
          <p className={paragraphClass}>
            This information may include your IP address (or other unique device
            identifier, including one that we may assign); certain details about
            your browser, operating system, and hardware; your location, if
            available; the URL that referred you to our Website; your activities
            on our Website, including your preferences; and other logging
            information, such as the date and time of your visit. We also use
            web server logs to collect and store information about Service
            usage.
          </p>
        </div>
        <div className={paragraphClass}>
          <p className={paragraphClass}>
            Third parties may use tracking technologies in connection with our
            Service, which may include the collection of information about your
            online activities over time and across third party websites. This
            Policy does not apply to these third party technologies because we
            may not control them and we are not responsible for them. Do Not
            Track is a technology that enables users to opt out of tracking by
            websites they do not visit. Currently, we do not monitor or take any
            action with respect to Do Not Track technology.
          </p>
        </div>
      </div>

      {/* Section 2: Purpose and Legal Basis */}
      <div className={sectionClass}>
        <h2 className={headingClass}>
          2. Purpose and legal basis of the processing
        </h2>
        <p className={paragraphClass}>
          MilGuru uses the information we collect about you for the following
          purposes:
        </p>

        <div>
          <p className='paragraphClass mb-1'>
            (1) Identification and authentication: We use your data to verify
            you when you access your account(if available)for the Services.
          </p>
          <p className='paragraphClass mb-1'>
            (2) Operating our services: We use your data to provide our
            services, process and fulfill orders, provide customer support, and
            to otherwise comply with our contractual obligations to you. We
            (and/or our third party vendors) use your financial information to
            process purchases made by you.
          </p>
          <p className='paragraphClass mb-1'>
            (3) Communicating with you: We use your data when we communicate
            with you (e.g., when we respond to a customer support or other
            inquiry).
          </p>
          <p className='paragraphClass mb-1'>
            (4) Improving our services: We use your data to understand how our
            services are being used and how we can improve them. In general, we
            analyze aggregated data, rather than specific user data. We may,
            however, need to analyze a specific case to address a specific
            problem (e.g., a bug that affects only a few accounts).
          </p>
          <p className='paragraphClass mb-1'>
            {`(5) Marketing and advertising: We use your data to show you ads on
            third party sites and to send you offers. We may also use your data
            to deliver third party advertisements to you. This may include
            "targeted ads" based upon your activities.`}
          </p>
          <p className='paragraphClass mb-1'>
            (6) Exercising our rights: Where reasonably necessary, we use your
            data to exercise our legal rights and prevent abuse of our service.
            For example, we may use your data to detect and prevent fraud, spam,
            or content that violates our Terms of Service.
          </p>
          <p className='paragraphClass mb-1'>
            (7) Legal compliance: We use your data where we are legally required
            to do so. For example, we may need to gather your data to respond to
            a subpoena or court order.
          </p>
          <p className='paragraphClass mb-1'>
            (8) Protecting your information: Where appropriate, we may
            anonymize, backup, and delete certain data.
          </p>
          <p className='mb-4 mt-2 paragraphClass'>
            We may use algorithms and other automated means to implement any of
            the above.
          </p>
          <p className='paragraphClass mb-1'>
            To the extent that you are a resident of a European Union country or
            the United Kingdom, or the EU General Data Protection Regulation
            (GDPR) or the United Kingdom General Data Protection Regulation (UK
            GDPR) otherwise applies, whenever we process your data for one of
            the above purposes, we have determined that one or more of the
            following lawful bases apply:
          </p>
          <p className='paragraphClass mb-1'>
            —Compliance with a legal obligation;
          </p>
          <p className='paragraphClass mb-1'> —Performance of a contract;</p>
          <p className='paragraphClass mb-1'>
            —Legitimate commercial interest;
          </p>
          <p className='paragraphClass mb-1'>
            In the event that one of the above lawful bases do not apply, we
            will not process your personal information for that purpose without
            receiving your voluntary consent to do so.
          </p>
        </div>
      </div>

      {/* Section 3: Sharing of Personal Information */}
      <div className={sectionClass}>
        <h2 className={headingClass}>
          3. Sharing of Personal Information with Third Parties
        </h2>
        <p className={paragraphClass}>
          We may share your personal information with companies that help us to
          run our business by processing personal information on behalf of us
          for the purposes identified above. Such companies include providers of
          payment processing services, server services providers, data analysis
          services providers, fraud monitoring and prevention providers, email
          delivery service providers, social media, and other marketing
          platforms and service providers. We use reasonable efforts to vet
          vendors for their privacy and data security practices. We require that
          such vendors agree to protect the data we share with them in
          accordance with this Policy. At the same time, we will clarify the
          privacy policy terms of this vendors f with you.
        </p>
        <p className={paragraphClass}>
          Specifically, MiiGuru may use third party tracking tools (such as
          Google Firebase Analytics) to track the information on how users use
          the products and websites, such information will be stored in third
          party servers. Such third party track tools may send the data analysis
          report to MiiGuru for MiiGuru’s above mentioned purpose. These third
          party tracking tools include but are not limited to the following;
        </p>
        <p className={paragraphClass}>
          {`Our partner firebase SDK will collect the following information from
          you: IP address, Users' names,Email addresses,iOS UDIDs,Secure Android
          IDs,Passwords,Phone numbers,User agents,Instance IDs,Crash
          traces,Breakpad minidump formatted data (NDK crashes only), Device
          specs (iOS),The above information will be used to uniquely identify
          the user to provide statistics and data analysis services.`}
        </p>
        <p className={paragraphClass}>
          MiiGuru may store the collected information on the servers leased from
          providers of third-party server service.
        </p>
        <p className={paragraphClass}>
          In addition, MiiGuru may disclose the User’s data to third parties for
          the following reasons: if MiiGuru is under a duty to disclose or share
          such personal data to comply with any legal obligation, or to protect
          the rights, property or safety of its business, its customers or
          others
        </p>
        <p className={paragraphClass}>
          {`in response to official requests (e.g., court orders, subpoenas,
          search warrants, national security requests, etc.) ("Requests") that
          we receive from government authorities or parties to legal
          proceedings. We handle user’s location Requests under user’s location
          law. If the Request originates from a foreign jurisdiction, we will
          typically disclose information where we in good faith believe that
          disclosure is permitted by both jurisdictions. In all cases, we may
          raise or waive any legal objection or right available to us, in our
          sole discretion.`}
        </p>
        <p className={paragraphClass}>
          {` where we reasonably believe that someone's life is at risk. For
          example, if we become aware of a person threatening to commit suicide,
          we may share that person's data with appropriate entities that may
          have the ability to help.`}
        </p>
        <p className={paragraphClass}>
          in situations involving legal claims against us or one of our users.
          If you challenge such a notice, we may share your response with the
          complainant.with potential transaction partners, advisors, and others
          in the event our company is, in whole or part, acquired by a third
          party. In such a case, we will use reasonable efforts to require the
          acquiring entity to comply with this Privacy Policy.
        </p>
      </div>

      {/* Section 4: Transfer of Personal Data */}
      <div className={sectionClass}>
        <h2 className={headingClass}>4. Transfer of personal data</h2>
        <p className={paragraphClass}>
          {`Your personal information may be stored on servers located in, and may be accessed by MiiGuru’s employees and contractors located in one or more countries outside of the country in which you reside。And by using an Application, the Services or the Site you consent to the transfer of your Info`}
        </p>
      </div>

      {/* Section 5: Cookie Policy */}
      <div className={sectionClass}>
        <h2 className={headingClass}>5. Cookie Policy</h2>
        <p className={paragraphClass}>
          MiiGuru utilizes cookies and related technologies on its website to
          deliver a fast, secure, and personalized experience tailored to your
          needs. These cookies also help us gain insights into the usage of
          various features, enabling us to enhance MiiGuru for all users.
        </p>
        <p className={paragraphClass}>
          {`By accessing and using our website, you agree to the use of cookies
            and related technologies as described in our Cookie Policy. These
            technologies help us provide a fast, secure, and personalized
            experience tailored to your preferences. They also enable us to
            gather insights on how our features are being used, allowing us to
            enhance MiiGuru for all users. If you do not agree with the use of
            cookies, you can disable or block them through your browser settings
            using the methods outlined in the "How to control cookies" section
            below.`}
        </p>

        <div className={paragraphClass}>
          <h3 className='font-medium mb-2'>What are cookies?</h3>
          <p className={paragraphClass}>
            {`Cookies are small text files that are stored on your computer or mobile device when you visit a website. These files allow the website to remember your actions and preferences for a certain period of time, so you don't have to re-enter them each time you visit different pages or return to the site.`}
          </p>
        </div>
        <div className={paragraphClass}>
          <h3 className='font-medium mb-2'>Cookies set by MiiGuru</h3>
          <p className={paragraphClass}>
            Like many other websites, MiiGuru utilizes cookies in various ways
            to deliver, test, and enhance their platform. All the cookies used
            by MiiGuru are transmitted safely.
          </p>
        </div>
        <div className={paragraphClass}>
          <h3 className='font-medium mb-2'>Safety</h3>
          <p className={paragraphClass}>
            In order to safeguard your MiiGuru account and prevent unauthorized
            access or actions without your knowledge or consent, we utilize
            cookies as a protective measure. These cookies store data that is
            sent from your browser to https://answerai.pro/, ensuring that the
            transmitted information corresponds to your account. These cookies
            are session cookies and will expire once you close your browser.
          </p>
        </div>
        <div className={paragraphClass}>
          <h3 className='font-medium mb-2'>Verification</h3>
          <p className={paragraphClass}>
            When you log in to your https://miiguru.com/ account, we will set a
            unique encrypted authentication cookie that enables you to stay
            logged in automatically during subsequent visits
            to https://miiguru.com/. These cookies are session cookies and will
            expire once you close your browser.
          </p>
          <p className={paragraphClass}>
            {` If you prefer to disable authentication cookies, you can follow the
            instructions outlined in the "How to Control Cookies" section.
            However, please note that doing so will prevent you from logging
            into MiiGuru . `}
          </p>
        </div>
        <div className={paragraphClass}>
          <h3 className='font-medium mb-2'>How to control cookies</h3>
          <p className={paragraphClass}>
            You can visit aboutcookies.org for detailed guidance on managing and
            deleting cookies. These resources provide information on how to
            delete existing cookies from your computer and configure your
            browser to prevent their future generation.
          </p>
          <p className={paragraphClass}>
            Please be aware that deleting cookies or preventing their generation
            may impact certain functionalities on the MiiGuru website. This
            includes the ability to log in to your MiiGuru account.
            Additionally, other features on the site may not work correctly.
          </p>
        </div>
      </div>

      {/* Contact Section and Agreement */}
      <div className={sectionClass}>
        <h2 className={headingClass}>6. Contact Us</h2>
        <p className={paragraphClass}>
          Please contact us if you need to change or correct your Personal
          Information, or if you have any questions or concerns not already
          addressed in this Privacy Policy.
        </p>
        <div className='flex items-center space-x-2 mt-6 mb-4'>
          <Checkbox
            id='checkbox'
            checked={enableTermsCondition}
            onCheckedChange={(checked) =>
              setEnableTermsCondition(checked as boolean)
            }
            className=' data-[state=checked]:bg-yellow data-[state=checked]:border-yellow hover:data-[state=checked]:bg-yellow-500 '
          />
          <Label htmlFor="'agreeTerms'" className='text-sm'>
            Agree Term & Condition
          </Label>
        </div>
        <div className='w-full flex justify-end'>
          <Button
            onClick={handleContinue}
            className='ms-auto w-full sm:w-auto bg-yellow hover:bg-yellow-500 text-black font-medium px-6 sm:px-8 py-2 rounded text-sm sm:text-base'
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
