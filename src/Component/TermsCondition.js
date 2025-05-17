import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";

function TermsCondition() {
  const [acc, setacc] = useState(true);
  const [acc1, setacc1] = useState("");
  const [acc2, setacc2] = useState("");
  const [acc3, setacc3] = useState("");
  const [acc4, setacc4] = useState("");
  const [acc5, setacc5] = useState("");
  const [acc6, setacc6] = useState("");
  const [acc7, setacc7] = useState("");
  const [acc8, setacc8] = useState("");
  const [acc9, setacc9] = useState("");
  const [acc10, setacc10] = useState("");
  const [acc11, setacc11] = useState("");
  const [acc12, setacc12] = useState("");
  const [acc13, setacc13] = useState("");
  const [acc14, setacc14] = useState("");
  return (
    <>
      <div style={{ marginTop: "100px" }}>
        <h3 className="text-center">TermsCondition</h3>
        <h5 className="text-center">
          Welcome to Goeasydocab and thank you for using our services!
        </h5>
        <p className="text-center">
          When you use our products or services, you're agreeing to our terms.
          So please take a few minutes to read over the below mentioned Terms
          and Conditions.
        </p>
        <p className="text-center">
          <b>
            PLEASE READ THESE USER TERMS CAREFULLY BEFORE DOWNLOADING OUR
            APPLICATION AND/OR USING OUR WEBSITE.
          </b>
        </p>
        <p className="text-center">
          <b>
            A. Terms and Conditions (In case of vehicle not owned by Company)
          </b>
        </p>
        <div className="container-fluid">
          <div className="add-gr">
            <div className="container-fluid">
              <div className="ad-b mt-4 mb-3"></div>
              <div className="main-body">
                <div className="row">
                  <div className="col-lg-3">
                    <div
                      className="profile-o"
                      style={{
                        width: "251px",
                        cursor: "pointer",
                      }}
                    >
                      <ListGroup>
                        <ListGroup.Item
                          className={`${acc ? "active-list" : ""}`}
                          onClick={() => {
                            setacc(true);
                            setacc1(false);
                            setacc2(false);
                            setacc3(false);
                            setacc4(false);
                            setacc5(false);
                            setacc6(false);
                            setacc7(false);
                            setacc8(false);
                            setacc9(false);
                            setacc10(false);
                            setacc11(false);
                            setacc12(false);
                            setacc13(false);
                            setacc14(false);
                          }}
                        >
                          <p>
                            <b>1. DEFINITIONS:</b>
                          </p>
                        </ListGroup.Item>
                        <ListGroup.Item
                          className={`${acc1 ? "active-list" : ""}`}
                          onClick={() => {
                            setacc(false);
                            setacc1(true);
                            setacc2(false);
                            setacc3(false);
                            setacc4(false);
                            setacc5(false);
                            setacc6(false);
                            setacc7(false);
                            setacc8(false);
                            setacc9(false);
                            setacc10(false);
                            setacc11(false);
                            setacc12(false);
                            setacc13(false);
                            setacc14(false);
                          }}
                        >
                          <p>
                            <b>2.General</b>
                          </p>
                        </ListGroup.Item>

                        <ListGroup.Item
                          className={`${acc2 ? "active-list" : ""}`}
                          onClick={() => {
                            setacc(false);
                            setacc1(false);
                            setacc2(true);
                            setacc3(false);
                            setacc4(false);
                            setacc5(false);
                            setacc6(false);
                            setacc7(false);
                            setacc8(false);
                            setacc9(false);
                            setacc10(false);
                            setacc11(false);
                            setacc12(false);
                            setacc13(false);
                            setacc14(false);
                          }}
                        >
                          <p>
                            <b>3.Charges and Payment</b>
                          </p>
                        </ListGroup.Item>
                        <ListGroup.Item
                          className={`${acc3 ? "active-list" : ""}`}
                          onClick={() => {
                            setacc(false);
                            setacc1(false);
                            setacc2(false);
                            setacc3(true);
                            setacc4(false);
                            setacc5(false);
                            setacc6(false);
                            setacc7(false);
                            setacc8(false);
                            setacc9(false);
                            setacc10(false);
                            setacc11(false);
                            setacc12(false);
                            setacc13(false);
                            setacc14(false);
                          }}
                        >
                          <p>
                            <b>4.Indemnification</b>
                          </p>
                        </ListGroup.Item>
                        <ListGroup.Item
                          className={`${acc4 ? "active-list" : ""}`}
                          onClick={() => {
                            setacc(false);
                            setacc1(false);
                            setacc2(false);
                            setacc3(false);
                            setacc4(true);
                            setacc5(false);
                            setacc6(false);
                            setacc7(false);
                            setacc8(false);
                            setacc9(false);
                            setacc10(false);
                            setacc11(false);
                            setacc12(false);
                            setacc13(false);
                            setacc14(false);
                          }}
                        >
                          <p>
                            <b>5.Liability</b>
                          </p>
                        </ListGroup.Item>
                        <ListGroup.Item
                          className={`${acc5 ? "active-list" : ""}`}
                          onClick={() => {
                            setacc(false);
                            setacc1(false);
                            setacc2(false);
                            setacc3(false);
                            setacc4(false);
                            setacc5(true);
                            setacc6(false);
                            setacc7(false);
                            setacc8(false);
                            setacc9(false);
                            setacc10(false);
                            setacc11(false);
                            setacc12(false);
                            setacc13(false);
                            setacc14(false);
                          }}
                        >
                          <p>
                            <b>
                              {" "}
                              6.INTELLECTUAL PROPERTY RIGHTS (Trademarks and
                              Copyrights)
                            </b>
                          </p>
                        </ListGroup.Item>
                        <ListGroup.Item
                          className={`${acc6 ? "active-list" : ""}`}
                          onClick={() => {
                            setacc(false);
                            setacc1(false);
                            setacc2(false);
                            setacc3(false);
                            setacc4(false);
                            setacc5(false);
                            setacc6(true);
                            setacc7(false);
                            setacc8(false);
                            setacc9(false);
                            setacc10(false);
                            setacc11(false);
                            setacc12(false);
                            setacc13(false);
                            setacc14(false);
                          }}
                        >
                          <p>
                            <b>7.Link To Third Party Website</b>
                          </p>
                        </ListGroup.Item>
                        <ListGroup.Item
                          className={`${acc7 ? "active-list" : ""}`}
                          onClick={() => {
                            setacc(false);
                            setacc1(false);
                            setacc2(false);
                            setacc3(false);
                            setacc4(false);
                            setacc5(false);
                            setacc6(false);
                            setacc7(true);
                            setacc8(false);
                            setacc9(false);
                            setacc10(false);
                            setacc11(false);
                            setacc12(false);
                            setacc13(false);
                            setacc14(false);
                          }}
                        >
                          <p>
                            <b>8.Term and Termination of the Contract</b>
                          </p>
                        </ListGroup.Item>
                        <ListGroup.Item
                          className={`${acc8 ? "active-list" : ""}`}
                          onClick={() => {
                            setacc(false);
                            setacc1(false);
                            setacc2(false);
                            setacc3(false);
                            setacc4(false);
                            setacc5(false);
                            setacc6(false);
                            setacc7(false);
                            setacc8(true);
                            setacc9(false);
                            setacc10(false);
                            setacc11(false);
                            setacc12(false);
                            setacc13(false);
                            setacc14(false);
                          }}
                        >
                          <p>
                            <b>9.Invalidity of one or more provisions</b>
                          </p>
                        </ListGroup.Item>
                        <ListGroup.Item
                          className={`${acc9 ? "active-list" : ""}`}
                          onClick={() => {
                            setacc(false);
                            setacc1(false);
                            setacc2(false);
                            setacc3(false);
                            setacc4(false);
                            setacc5(false);
                            setacc6(false);
                            setacc7(false);
                            setacc8(false);
                            setacc9(true);
                            setacc10(false);
                            setacc11(false);
                            setacc12(false);
                            setacc13(false);
                            setacc14(false);
                          }}
                        >
                          <p>
                            <b>
                              {" "}
                              10.Modification of the Service and User Terms
                            </b>
                          </p>
                        </ListGroup.Item>
                        <ListGroup.Item
                          className={`${acc10 ? "active-list" : ""}`}
                          onClick={() => {
                            setacc(false);
                            setacc1(false);
                            setacc2(false);
                            setacc3(false);
                            setacc4(false);
                            setacc5(false);
                            setacc6(false);
                            setacc7(false);
                            setacc8(false);
                            setacc9(false);
                            setacc10(true);
                            setacc11(false);
                            setacc12(false);
                            setacc13(false);
                            setacc14(false);
                          }}
                        >
                          <p>
                            <b>11.Notice</b>
                          </p>
                        </ListGroup.Item>
                        <ListGroup.Item
                          className={`${acc11 ? "active-list" : ""}`}
                          onClick={() => {
                            setacc(false);
                            setacc1(false);
                            setacc2(false);
                            setacc3(false);
                            setacc4(false);
                            setacc5(false);
                            setacc6(false);
                            setacc7(false);
                            setacc8(false);
                            setacc9(false);
                            setacc10(false);
                            setacc11(true);
                            setacc12(false);
                            setacc13(false);
                            setacc14(false);
                          }}
                        >
                          <p>
                            <b>12.Assignment</b>
                          </p>
                        </ListGroup.Item>
                        <ListGroup.Item
                          className={`${acc12 ? "active-list" : ""}`}
                          onClick={() => {
                            setacc(false);
                            setacc1(false);
                            setacc2(false);
                            setacc3(false);
                            setacc4(false);
                            setacc5(false);
                            setacc6(false);
                            setacc7(false);
                            setacc8(false);
                            setacc9(false);
                            setacc10(false);
                            setacc11(false);
                            setacc12(true);
                            setacc13(false);
                            setacc14(false);
                          }}
                        >
                          <p>
                            <b>13.Privacy and Cookie Notice</b>
                          </p>
                        </ListGroup.Item>
                        <ListGroup.Item
                          className={`${acc13 ? "active-list" : ""}`}
                          onClick={() => {
                            setacc(false);
                            setacc1(false);
                            setacc2(false);
                            setacc3(false);
                            setacc4(false);
                            setacc5(false);
                            setacc6(false);
                            setacc7(false);
                            setacc8(false);
                            setacc9(false);
                            setacc10(false);
                            setacc11(false);
                            setacc12(false);
                            setacc13(true);
                            setacc14(false);
                          }}
                        >
                          <p>
                            <b>14.Excusable Delays (Force Majeure)</b>
                          </p>
                        </ListGroup.Item>
                        <ListGroup.Item
                          className={`${acc14 ? "active-list" : ""}`}
                          onClick={() => {
                            setacc(false);
                            setacc1(false);
                            setacc2(false);
                            setacc3(false);
                            setacc4(false);
                            setacc5(false);
                            setacc6(false);
                            setacc7(false);
                            setacc8(false);
                            setacc9(false);
                            setacc10(false);
                            setacc11(false);
                            setacc12(false);
                            setacc13(false);
                            setacc14(true);
                          }}
                        >
                          <p>
                            <b>15.Miscellaneous</b>
                          </p>
                        </ListGroup.Item>
                      </ListGroup>
                    </div>
                  </div>
                  <div className="col-lg-8">
                    {acc ? (
                      <div>
                        <p>
                          <b>1. DEFINITIONS:</b>
                        </p>
                        <div>
                          '
                          <ul>
                            <li>
                              'Vehicle' shall mean any vehicle / cab / taxi to
                              be provided to the Customer for performance of the
                              Services.
                            </li>
                            <li>
                              'Company' shall hereinafter individually and
                              collectively mean Goeasydocab Pvt. Ltd. This
                              expression includes the Employees, Authorized
                              Representatives, Customer Care Executives or
                              Representatives, Agents, etc.
                            </li>
                            <li>
                              'Customer' or 'You' shall mean any person availing
                              the Services provided by the Service Provider.
                            </li>
                            <li>
                              'Service Provider' shall mean any person or entity
                              possessing the Vehicle and providing the Services
                              to the Customer.
                            </li>
                            <li>
                              'Force Majeure Event' includes but is not limited
                              to strikes, lockouts, labor disturbances, civil
                              commotion, riots, war, acts of terrorism, major
                              traffic disruption, action of any government or
                              regulatory authority, fuel shortages, abnormal
                              weather conditions at the location of services,
                              abnormal business circumstances or any other cause
                              beyond the reasonable control of the affected
                              party which by exercise of reasonable diligence
                              could not have been prevented or provided against.
                            </li>
                            <li>
                              'Services' shall mean and include the ride hailing
                              services; the pickup and drop services and / or
                              transportation services to be provided by the
                              Service Provider from and to such locations as may
                              be requested by You.
                            </li>
                            <li>
                              'Use of Service' shall mean and includes but is
                              not limited to, all the Customers dialling the
                              dedicated number of the Company or visiting the
                              official website of the Company or downloading the
                              Mobile Application or availing the Services from
                              the street side or dedicated pick-up locations of
                              the Company.
                            </li>
                          </ul>
                        </div>
                      </div>
                    ) : acc1 ? (
                      <div>
                        <p>
                          <b>2. General:</b>
                        </p>
                        <div>
                          <p>
                            The Company provides technology based services for
                            booking Vehicles in certain cities of India basis to
                            you and you agree to avail the Services offered by
                            third party Service Providers, drivers or vehicle
                            operators ("the Service Provider").
                          </p>
                          <p>
                            The Company shall take your booking request and
                            forward it to the Service Provider and the Service
                            Provider shall have the sole discretion to accept or
                            reject such request. The Service Provider has
                            discretion over whether to receive the booking
                            request made by the Company. If the Service Provider
                            accepts the booking request made by the Company for
                            the Services, the Company shall notify you and
                            provides the information regarding the Service
                            Provider including its name, contact number etc.
                          </p>
                          <p>
                            The Company shall make reasonable efforts to bring
                            you in contact with the Service Provider in order to
                            provide Services subject to availability of the
                            Service Provider in or around your location at the
                            time of your booking request made to the Company.
                          </p>
                          <p>
                            For the avoidance of doubt, it is clarified that the
                            Company itself does not provide the Services. It is
                            the Service Provider who shall render the Service to
                            you. The provision of the Services by the Service
                            Provider to you is therefore subject to the
                            agreement (to be) entered into between you and the
                            Service Provider and the Company shall never be a
                            party to such agreement. Even after acceptance of
                            booking, the Service Provider may not reach your
                            pick up location or decide not to render his
                            Services in which event the Company shall not be
                            held liable to you.
                          </p>
                          <p>
                            You warrant that the information you provide to the
                            Company is accurate and complete. The Company is
                            entitled to at all time verify the information that
                            you have provided. You may only access the Service
                            using the authorized means. It is your
                            responsibility to check to ensure you download the
                            correct mobile application for your device or visit
                            the correct portal or dial-in the accurate call
                            center number. The Company shall not be liable if
                            you do not download the correct mobile application
                            or visit the appropriate web portal or dial-in the
                            correct call center number. The Company reserves the
                            right to discontinue or introduce any of the modes
                            of booking Vehicles. You will refrain from doing
                            anything which we reasonably believe to be
                            disreputable or capable of damaging our reputation;
                            You will comply with all applicable laws;
                          </p>
                          <p>
                            You warrant that the information you provide to the
                            Company is accurate and complete. The Company is
                            entitled to at all time verify the information that
                            you have provided. You may only access the Service
                            using the authorized means. It is your
                            responsibility to check to ensure you download the
                            correct mobile application for your device or visit
                            the correct portal or dial-in the accurate call
                            center number. The Company shall not be liable if
                            you do not download the correct mobile application
                            or visit the appropriate web portal or dial-in the
                            correct call center number. The Company reserves the
                            right to discontinue or introduce any of the modes
                            of booking Vehicles. You will refrain from doing
                            anything which we reasonably believe to be
                            disreputable or capable of damaging our reputation;
                            You will comply with all applicable laws;
                          </p>
                          <p>
                            You warrant that the information you provide to the
                            Company is accurate and complete. The Company is
                            entitled to at all time verify the information that
                            you have provided. You may only access the Service
                            using the authorized means. It is your
                            responsibility to check to ensure you download the
                            correct mobile application for your device or visit
                            the correct portal or dial-in the accurate call
                            center number. The Company shall not be liable if
                            you do not download the correct mobile application
                            or visit the appropriate web portal or dial-in the
                            correct call center number. The Company reserves the
                            right to discontinue or introduce any of the modes
                            of booking Vehicles. You will refrain from doing
                            anything which we reasonably believe to be
                            disreputable or capable of damaging our reputation;
                            You will comply with all applicable laws;
                          </p>
                          <p>
                            You will treat the Service Provider introduced to
                            you through us with respect and not to cause damage
                            to their Vehicle or engage in any unlawful,
                            threatening, harassing, abusive behaviour or
                            activity whilst using their Vehicle or the Service;
                          </p>
                          <p>
                            You will compensate and defend us fully against any
                            claims or legal proceedings brought against us by
                            any other person as a result of your breach of these
                            Terms.
                          </p>
                          <p>
                            Please note that we are not responsible for the
                            behaviour, actions or inactions of the Service
                            Provider, quality of cab which you may use (through
                            us or otherwise). Any Contract for the provision of
                            Services is between you and the Service Provider and
                            not us and we simply provide a platform to introduce
                            the Customer and the Service Provider.
                          </p>
                          <b>
                            By using the mobile Application of the Company, you
                            further agree that:
                          </b>
                          <ul>
                            <li>
                              You will download the Application for your sole,
                              personal use and will not resell it to a third
                              party;
                            </li>
                            <li>
                              You will not authorize others to use your account;
                            </li>
                            <li>
                              You will not assign or otherwise transfer your
                              account to any other person or legal entity;
                            </li>
                            <li>
                              You will not use an account that is subject to any
                              rights of a person other than you without
                              appropriate authorization;
                            </li>
                            <li>
                              You will not use the Application for unlawful
                              purposes, including but not limited to sending or
                              storing any unlawful material or for fraudulent
                              purposes;
                            </li>
                            <li>
                              You will not use the Application to cause
                              nuisance, annoyance or inconvenience;
                            </li>
                            <li>
                              You will not impair the proper operation of the
                              network;
                            </li>
                            <li>
                              You will not try to harm Application in any way
                              whatsoever;
                            </li>
                            <li>
                              You will not copy, or distribute the Application
                              or other Company Content without written
                              permission from Company;
                            </li>
                            <li>
                              You will keep secure and confidential your account
                              password or any identification we provide you
                              which allows access to the Application;
                            </li>
                            <li>
                              You will provide us with whatever proof of
                              identity we may reasonably request;
                            </li>
                            <li>
                              You will only use an access point or 3G data
                              account (AP) which you are authorized to use;
                            </li>
                            <li>
                              You will not use the Application with an
                              incompatible or unauthorized device;
                            </li>
                            <li>
                              You will comply with all applicable law from your
                              home nation, the country, state and/or city in
                              which you are present while using the Application.
                            </li>
                          </ul>
                          <p>
                            The Company reserves the right to immediately
                            terminate use of the Application should you not
                            comply with the any of the above rules. The fare
                            range displayed in the 'Fare Estimation' provided in
                            the Goeasydocab Mobile App is an estimate. The
                            actual fare payable will be displayed in the billing
                            device in the Vehicle or communicate to the Customer
                            via e-mail or SMS. The Company takes no
                            responsibility for the accuracy of the estimates and
                            any variation between the estimate and the actual
                            fare. Above estimates are exclusive of all toll
                            charges, parking charge & discounts etc. Toll and
                            other charges are payable separately at actual.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <>
                        {acc2 ? (
                          <div>
                            <p>
                              <b>3.Charges and Payment:</b>
                            </p>
                            <div>
                              You will make payment in full for the Services
                              provided to you. You shall be required to pay trip
                              charges for the Service to the Service Provider
                              and the rates can be found on the website and
                              mobile application of the Company. The trip
                              charges shall be updated or amended from time to
                              time and it shall be your responsibility to remain
                              informed about the current trip charges for the
                              Services. You agree that the trip charges shall
                              include the trip fare and any additional charges
                              levied by the Company which includes waiting
                              charges, parking charges, additional night
                              surcharge (where applicable) and any fee or levy
                              presently payable or hereinafter imposed by the
                              law or required to be paid for availing of the
                              Services. The fares and other rates vary and
                              differ for different locations and different
                              segment of Vehicles. Convenience charge (booking
                              fee) shall be applicable for the bookings made
                              through the Company call center as per the rates
                              provided in fare chart. For Outstation Round
                              Trips, the charges will be applicable for each
                              Calendar day. If the travel time extends to the
                              next calendar day beyond 12 am midnight, next
                              calendar day Round Trip charges will be
                              applicable. You agree that you will pay for all
                              Services you purchase from the Service Provider
                              either by way of cash or any available
                              non-cash/digital payment modes like credit/debit
                              card/ wallet /UPI/pay later merchants or any new
                              payment methods that the Company introduces from
                              time to time. In the event the payment cannot be
                              accepted through non-cash/digital modes, you shall
                              be required to pay the trip charges by way of
                              cash. Any payment made is non-refundable. At the
                              end of the trip, we will facilitate for you to
                              receive a copy of the invoice from the Service
                              Provider on your registered e-mail account with
                              the Company. The Company offers the mode / option
                              for payment of tips to the drivers. The amount to
                              be paid as tips is not mandatory and is solely as
                              per the wish of the User or the experience of the
                              User post availing the Services. The amount of tip
                              is directly payable by the User to the driver and
                              the Company is neither involved nor responsible
                              for any such tips paid by the User to the driver.
                              The amount paid as tip is not taxable and no
                              receipt to that effect will be provided, also the
                              same is non-refundable.
                            </div>
                          </div>
                        ) : acc3 ? (
                          <div>
                            <p>
                              <b>4.Indemnification:</b>
                            </p>
                            <div>
                              By accepting these User Terms and using the
                              application, you agree that you shall defend,
                              indemnify and hold the Company, its affiliates,
                              its licensors, and each of their officers,
                              directors, other users, employees, attorneys and
                              agents harmless from and against any and all
                              claims, costs, damages, losses, liabilities and
                              expenses (including attorneys' fees and costs)
                              arising out of or in connection with: (a) your
                              violation or breach of any term of these User
                              Terms or any applicable law or regulation, whether
                              or not referenced herein; (b) your violation of
                              any rights of any third party, including Service
                              Providers arranged via the Application, or (c)
                              your use or misuse of the Application or Website.
                            </div>
                          </div>
                        ) : acc4 ? (
                          <div>
                            <p>
                              <b>5.Liability:</b>
                            </p>
                            <div>
                              The information, recommendations provided to you
                              on or through the website, or the application is
                              for general information purposes only and does not
                              constitute advice. The Company will reasonably
                              keep the website and the application and its
                              contents correct and up to date but does not
                              guarantee that (the contents of) the website
                              and/or application are free of errors, defects,
                              malware and viruses or that the website and/or
                              application are correct, up to date and accurate.
                            </div>
                            <div>
                              The Company shall not be liable for any damages
                              resulting from the use of or inability to use the
                              website or application (but to the exclusion of
                              death or personal injury), including damages
                              caused by malware, viruses or any incorrectness or
                              incompleteness of the information or the website
                              or application, unless such damage is the result
                              of any wilful misconduct or from gross negligence
                              on the part of the Company.
                            </div>
                            <div>
                              The Company shall further not be liable for
                              damages resulting from the use of (or the
                              inability to use) electronic means of
                              communication with the website or the application,
                              including – but not limited to – damages resulting
                              from failure or delay in delivery of electronic
                              communications, interception or manipulation of
                              electronic communications by third parties or by
                              computer programs used for electronic
                              communications and transmission of viruses.
                              Without prejudice to the foregoing, and insofar as
                              allowed under mandatory applicable law, the
                              Company's aggregate liability shall in no event
                              exceed an amount of INR 1000.
                            </div>
                            <div>
                              The quality of the Services requested through the
                              use of the application or the Service is entirely
                              the responsibility of the Service Provider who
                              ultimately provides such Services to you. The
                              Company under no circumstance accepts liability in
                              connection with and/or arising from the Services
                              provided by the Service Provider or any acts,
                              action, behaviour, conduct, and/or negligence on
                              the part of the Service Provider. Any complaints
                              about the Services provided by the Service
                              Provider should therefore be submitted to the
                              Service Provider.
                            </div>
                          </div>
                        ) : acc5 ? (
                          <div>
                            <p>
                              <b>
                                6.INTELLECTUAL PROPERTY RIGHTS (Trademarks and
                                Copyrights):
                              </b>
                            </p>
                            <div>
                              The Company is the sole owner and lawful licensee
                              of all the rights to the web site, mobile
                              application or any other digital media and its
                              contents. The content means its design, layout,
                              text, images, graphics, sounds, video, etc. the
                              website, mobile application or any other digital
                              media content embody trade secrets and
                              intellectual property rights protected under
                              worldwide copyright and other laws. All titles,
                              ownership and intellectual property rights in the
                              website and its content shall remain with the
                              Company, its affiliates, agents, authorized
                              representatives or licensor's as the case may be.
                            </div>
                            <div>
                              All rights not otherwise claimed under this Terms
                              and Conditions or by the Company are hereby
                              reserved. The information contained in this web
                              site is intended, solely to provide general
                              information for the personal use of the reader,
                              who accepts full responsibility for its use
                            </div>
                            <div>
                              The Company does not represent or endorse the
                              accuracy or reliability of any information or
                              advertisement contained on, distributed through,
                              or linked, downloaded or accessed from any of the
                              services contained on this website, or the quality
                              of any products, information or other materials
                              displayed, or obtained by you as a result of any
                              product, information or other materials displayed,
                              or obtained by you as a result of an advertisement
                              or any other information or offer in or in
                              connection with the service.
                            </div>
                            <div>
                              All related icons and logos are registered
                              trademarks or service marks or word marks of the
                              Company in various jurisdictions and are protected
                              under applicable copyrights, trademarks and other
                              proprietary rights laws. The unauthorized copying,
                              modification, use or publication of these marks is
                              strictly prohibited.
                            </div>
                            <div>
                              All the contents on this web site is copyright of
                              the Company except the third party content and
                              link to third party website on our website.
                              Subject to your compliance with these Terms, the
                              Company grants you a limited non-exclusive,
                              non-transferable license to download and install a
                              copy of the application on a single mobile device
                              that you own or control and to run such copy of
                              the application solely for your own personal use.
                              You shall not (i) license, sublicense, sell,
                              resell, transfer, assign, distribute or otherwise
                              commercially exploit or make available to any
                              third party the application in any way; (ii)
                              modify or make derivative works based upon the
                              application; (iii) create Internet "links" or
                              "frame" or "mirror" any application on any other
                              server or wireless or Internet-based device; (iv)
                              reverse engineer or access the application in
                              order to (a) design or build a competitive product
                              or service, (b) design or build a product using
                              similar ideas, features, functions or graphics of
                              the application, or (c) copy any ideas, features,
                              functions or graphics of the application, or (v)
                              launch an automated program or script, including,
                              but not limited to, web spiders, web crawlers, web
                              robots, web ants, web indexers, bots, viruses or
                              worms, or any program which may make multiple
                              server requests per second, or unduly burdens or
                              hinders the operation and/or performance of the
                              application.
                            </div>
                          </div>
                        ) : acc6 ? (
                          <div>
                            {" "}
                            <p>
                              <b>7.Link To Third Party Website:</b>
                            </p>
                            <div>
                              During the use of the website or the application,
                              links to websites that are owned and controlled by
                              third parties may be provided from time to time in
                              order to enter into correspondence with, purchase
                              goods or services from, participate in promotions
                              of third parties. These links take you off the
                              website, the application and are beyond the
                              Company's control.
                            </div>
                            <div>
                              During use of the website and the application, you
                              may enter into correspondence with, purchase goods
                              and/or services from, or participate in promotions
                              of third party service providers, advertisers or
                              sponsors showing their goods and/or services
                              through a link on the website or through the
                              application or Service. These links take you off
                              the website, the application and the Service and
                              are beyond the Company's control. The websites you
                              can link to have their own separate terms and
                              conditions as well as a privacy policy. The
                              Company is not responsible and cannot be held
                              liable for the content and activities of these
                              websites. You therefore visit or access these
                              websites entirely at your own risk. Please note
                              that these other websites may send their own
                              cookies to users, collect data or solicit personal
                              information, and you are therefore advised to
                              check the terms of use or privacy policies on
                              those websites prior to using them.
                            </div>
                            <div>
                              By using our Services, You agree not only to be
                              bound by our Terms and Conditions provided herein
                              but also agree to be bound by the
                              <b style={{ color: "blue" }}>
                                {" "}
                                Google Maps/Google Earth Additional Terms of
                                Service (including the Google Privacy Policy).
                              </b>
                            </div>
                          </div>
                        ) : acc7 ? (
                          <div>
                            <p>
                              <b>8.Term and Termination of the Contract:</b>
                            </p>
                            <div>
                              The Contract between the Company and you is
                              concluded for an indefinite period. You are
                              entitled to terminate the Contract at all times by
                              permanent deletion of the application installed on
                              your smart phone, thus disabling the use by you of
                              the application and the Service.
                            </div>
                            <div>
                              Company is entitled to terminate the Contract at
                              all times and with immediate effect (by disabling
                              your use of the application and the Service) if
                              you: (a) violate or breach any term of these User
                              Terms, or (b) in the opinion of the Company,
                              misuse the application or the Service. The Company
                              is not obliged to give notice of the termination
                              of the Contract in advance.
                            </div>
                          </div>
                        ) : acc8 ? (
                          <div>
                            <p>
                              <b>9.Invalidity of one or more provisions:</b>
                            </p>
                            <div>
                              The invalidity of any term of these User Terms
                              shall not affect the validity of the other
                              provisions of these User Terms. If and to the
                              extent that any provision of these User Terms is
                              invalid, or is unacceptable in the given
                              circumstances according to the criteria of
                              reasonableness and fairness, a provision shall
                              apply between the parties instead that is
                              acceptable considering all the circumstances and
                              which corresponds with the provisions of the void
                              part as much as possible, taking into account the
                              content and the purpose of these User Terms.
                            </div>
                          </div>
                        ) : acc9 ? (
                          <div>
                            <p>
                              <b>
                                10.Modification of the Service and User Terms:
                              </b>
                            </p>
                            <div>
                              The Company reserves the right, at its sole
                              discretion, to modify or replace any of these User
                              Terms, or change, suspend, or discontinue the
                              application (including without limitation, the
                              availability of any feature, database, or content)
                              at any time by posting a notice on the website or
                              by sending you notice through the Service,
                              application or via email. The Company may also
                              impose limits on certain features and services or
                              restrict your access to parts or all of the
                              Service without notice or liability.
                            </div>
                          </div>
                        ) : acc10 ? (
                          <div>
                            <p>
                              <b>11.Notice</b>
                            </p>
                            <div>
                              The Company may give notice by means of a general
                              notice on the Service or Application, or by
                              electronic mail to your email address on record in
                              the Company's account information, or by written
                              communication sent by regular mail to your address
                              on record in Company's account information.
                            </div>
                          </div>
                        ) : acc11 ? (
                          <div>
                            {" "}
                            <p>
                              <b>12.Assignment</b>
                            </p>
                            <div>
                              You may not assign your rights under these User
                              Terms without prior written approval of the
                              Company.
                            </div>
                          </div>
                        ) : acc12 ? (
                          <div>
                            <p>
                              <b>13.Privacy and Cookie Notice:</b>
                            </p>
                            <div>
                              The Company collects and processes the personal
                              data of the visitors of the website and users of
                              the application according to the Privacy and
                              Cookie Notice
                            </div>
                          </div>
                        ) : acc13 ? (
                          <div>
                            {" "}
                            <p>
                              <b>14.Excusable Delays (Force Majeure):</b>
                            </p>
                            <div>
                              Neither party hereto shall be responsible for
                              delays or failures in performance resulting from
                              acts beyond its reasonable control and without its
                              fault or negligence. Such excusable delays or
                              failures may be caused by, among other things,
                              strikes, lock-out, riots, rebellions, accidental
                              explosions, floods, storms, acts of God and
                              similar occurrences.
                            </div>
                          </div>
                        ) : acc14 ? (
                          <div>
                            <p>
                              <b>15.Miscellaneous:</b>
                            </p>
                            <div>
                              The Courts of Mumbai, India shall have the sole
                              and exclusive jurisdiction in respect of any
                              matters arising from the Use of the Services
                              offered by the Company or the agreement or
                              arrangement between the Company and the Customer.
                              All claims and disputes arising under this Terms
                              and Conditions should be notified to the Company
                              within 30 days from the event date, after which
                              You shall have no rights to raise any claim
                              against the Company.
                            </div>
                            <div>
                              The Company shall be entitled to add to, vary or
                              amend any or all these terms and conditions at any
                              time and the Customer shall be bound by such
                              addition, variation or amendment once such
                              addition, variation or amendment are incorporated
                              into these terms and conditions at website at
                              www.Goeasydocab.in or on the date that the Company
                              may indicate that such addition, variation or
                              amendment is to come into effect. The Company
                              reserves the right to publish information of
                              beneficiaries of any program, offer, scheme or any
                              promotion.
                            </div>
                            <div>
                              The Customer who seeks to use or obtain any of the
                              services, benefits, facilities and arrangements as
                              offered by the Company's partner, then the
                              provisions of such services, benefits, facilities
                              or arrangements will be subject to the respective
                              terms and conditions of the said Service Provider,
                              being the provider of the said Services, benefits,
                              facilities or arrangements.
                            </div>
                            <div>
                              The Company provides links to third party website
                              as a convenience to the Customers or as an
                              advertisement and the Company does not have any
                              control over such sites i.e. content and resources
                              provided by them. The Company recommends reading
                              such site's terms and conditions and/or privacy
                              policies before using such sites.
                            </div>
                            <div>
                              This web site (www.Goeasydocab.in) is published
                              and maintained by the Company access, browsing or
                              use of the facilities provided by this site
                              constitutes a deemed acceptance, without
                              limitation or qualification, of the terms and
                              conditions as set forth herein below, by the user
                              and constitutes an agreement between Company and
                              the Customers.
                            </div>
                            <div>
                              You authorize the Company to send various
                              communication including service messages, offers,
                              promotions, and other promotional communication
                              through various media channels, such as calls,
                              messages, e-mails, social media and notifications
                              in relation to the Company’s services.
                            </div>
                            <b>
                              B.Terms and Conditions (In case of Vehicle owned
                              by Company) This Terms and Conditions explain the
                              nature and scope of the relation between the You
                              and the Company (hereinafter the following Terms
                              and Conditions should be referred to as the
                              "Standard Terms and Conditions")
                            </b>
                            <p>
                              <b>1. DEFINITIONS:</b>
                            </p>
                            <ul>
                              <li>
                                • 'Cab' or 'Taxi' shall mean the radio Cab to be
                                provided by the Company to the Customer for
                                performance of the Services.
                              </li>
                              <li>
                                • 'Company' shall hereinafter individually and
                                collectively mean MLL Mobility Pvt. Ltd. This
                                expression includes the Employees, Authorized
                                Representatives, Customer Care Executives or
                                Representatives, Agents, etc.
                              </li>
                              <li>
                                • 'Driver' shall mean the person engaged by the
                                Company as the driver of the Cab/Taxi.
                              </li>
                              <li>
                                • 'Force Majeure Event' includes but is not
                                limited to strikes, lockouts, labour
                                disturbances, civil commotion, riots, war, acts
                                of terrorism, major traffic disruption, action
                                of any government or regulatory authority, fuel
                                shortages, abnormal weather conditions at the
                                location of services, abnormal business
                                circumstances or any other cause beyond the
                                reasonable control of the affected party which
                                by exercise of reasonable diligence could not
                                have been prevented or provided against.
                              </li>
                              <li>
                                • 'Services' shall mean the pickup and drop
                                service to be provided through the Vehicles
                                owned by the Company from and to such locations
                                as may be requested by You.
                              </li>
                              <li>
                                • 'Use of Service' shall mean and includes but
                                is not limited to, all the Customers dialling
                                the dedicated number of the Company or visiting
                                the official website of the Company or
                                downloading the Mobile Application or hiring the
                                Cab from the street side or dedicated pick-up
                                locations of the Company.
                              </li>
                            </ul>
                            <p>
                              <b>2.GENERAL CONDITIONS:</b>
                            </p>
                            <ul>
                              <li>
                                • These Terms and Conditions cover limitations
                                and exclusion on the liability over the Company.
                                These Terms and Conditions are applicable to You
                                and are governing the use of Cabs throughout
                                India.
                              </li>
                              <li>
                                • You are bound by the following Terms and
                                Conditions and are legally in contract with the
                                Company. This Terms and Conditions apply to all
                                the Services offered by the Company collectively
                                with any additional Terms and Conditions that
                                may be applicable to the specific Service used
                                or accessed by You or offered by the Company.
                              </li>
                              <li>
                                • You warrant that the information you provide
                                to the Company is accurate and complete. The
                                Company is entitled to at all time verify the
                                information that you have provided. You may only
                                access the Service using the authorized means.
                                It is your responsibility to check to ensure you
                                download the correct mobile application for your
                                device or visit the correct portal or dial-in
                                the accurate call center number. The Company
                                shall not be liable if you do not download the
                                correct mobile application or visit the
                                appropriate web portal or dial-in the correct
                                call center number. The Company reserves the
                                right to discontinue or introduce any of the
                                modes of booking Taxi.
                              </li>
                              <li>
                                • You will not use the taxi for any unlawful
                                purpose; in any way that interrupts, damages,
                                impairs or renders taxi less efficient.
                              </li>
                              <li>
                                • You will refrain from doing anything which we
                                reasonably believe to be disreputable or capable
                                of damaging our reputation;
                              </li>
                              <li>
                                • You acknowledge that we have limited control
                                over the nature and content of information and
                                chat transmitted or received by you or other
                                users of Taxi. Although we reserve the right to
                                do so, we do not monitor such content in the
                                usual course of business and will not be liable
                                for any such content. If you have a complaint
                                about another user please contact us via the
                                application.
                              </li>
                              <li>
                                • You will comply with all applicable laws;
                              </li>
                              <li>
                                • You will treat the Drivers introduced to you
                                through us with respect and not to cause damage
                                to their taxi or engage in any unlawful,
                                threatening, harassing, abusive behaviour or
                                activity whilst using their Taxi or the Service;
                              </li>
                              <li>
                                • You will compensate and defend us fully
                                against any claims or legal proceedings brought
                                against us by any other person as a result of
                                your breach of these Terms.
                              </li>
                              <li>
                                • You agree that the Company does not assure you
                                the availability of Taxi even after accepting
                                and/or confirming the booking.
                              </li>
                              <li>
                                • Please note that we are not responsible for
                                the behaviour, actions or inactions of Drivers
                                of Taxis, quality of Cab which you may use.
                              </li>
                              <li>
                                • By using the mobile application of the
                                Company, you further agree that:
                              </li>
                              <ul>
                                <li>
                                  • You will download the application for your
                                  sole, personal use and will not resell it to a
                                  third party;
                                </li>
                                <li>
                                  • You will not authorize others to use your
                                  account;
                                </li>
                                <li>
                                  • You will not assign or otherwise transfer
                                  your account to any other person or legal
                                  entity
                                </li>
                                <li>
                                  • You will not use an account that is subject
                                  to any rights of a person other than you
                                  without appropriate authorization;
                                </li>
                                <li>
                                  • You will not use the application for
                                  unlawful purposes, including but not limited
                                  to sending or storing any unlawful material or
                                  for fraudulent purposes;
                                </li>
                                <li>
                                  • You will not use the application to cause
                                  nuisance, annoyance or inconvenience;
                                </li>
                                <li>
                                  • You will not impair the proper operation of
                                  the network;
                                </li>
                                <li>
                                  • You will not try to harm application in any
                                  way whatsoever;
                                </li>
                                <li>
                                  • You will not copy, or distribute the
                                  application or other Company content without
                                  written permission from Company;
                                </li>
                                <li>
                                  • You will keep secure and confidential your
                                  account password or any identification we
                                  provide you which allows access to the
                                  application;
                                </li>
                                <li>
                                  • You will provide us with whatever proof of
                                  identity we may reasonably request;
                                </li>
                                <li>
                                  • You will only use an access point or 3G data
                                  account (AP) which you are authorized to use;
                                </li>
                                <li>
                                  • You will not use the application with an
                                  incompatible or unauthorized device;
                                </li>
                                <li>
                                  • You will comply with all applicable law from
                                  your home nation, the country, state and/or
                                  city in which you are present while using the
                                  application.
                                </li>
                                <li>
                                  The Company reserves the right to immediately
                                  terminate use of the application should you
                                  not comply with the any of the above rules.
                                </li>
                              </ul>
                            </ul>
                            <p>
                              <b>3.Charges and Payment:</b>
                            </p>
                            <p>
                              You shall be required to pay trip charges for the
                              Service and the rates can be found on the website
                              and mobile application or such other booking
                              platform of the Company. The trip charges shall be
                              updated or amended from time to time and it shall
                              be your responsibility to remain informed about
                              the current trip charges for the Services. You
                              agree that the trip charges shall include the trip
                              fare and any additional charges levied by the
                              Company which includes waiting charges, parking
                              charges, additional night surcharge (where
                              applicable) and any fee or levy presently payable
                              or hereinafter imposed by the law or required to
                              be paid for availing of the Services. The toll
                              charges will be payable by you as applicable, only
                              when the Cab crosses the toll post. Convenience
                              charge (booking fee) shall be applicable for the
                              bookings made through the Company call center as
                              per the rates provided in fare chart. For
                              Outstation Round Trips, the charges will be
                              applicable for each Calendar day. If the travel
                              time extends to the next calendar day beyond 12 am
                              midnight, next calendar day Round Trip charges
                              will be applicable. Any payment made is
                              non-refundable. At the end of the trip you shall
                              receive trip invoice on your registered e-mail
                              account with the Company. The Company offers the
                              mode / option for payment of tips to the drivers.
                              The amount to be paid as tips is not mandatory and
                              is solely as per the wish of the User or the
                              experience of the User post availing the Services.
                              The amount of tip is directly payable by the User
                              to the driver and the Company is neither involved
                              nor responsible for any such tips paid by the User
                              to the driver. The amount paid as tip is not
                              taxable and no receipt to that effect will be
                              provided, also the same is non-refundable.
                            </p>
                            <p>
                              You agree that you will pay for all Services you
                              avail from the Company either by way of cash or
                              any available non-cash/digital payment modes like
                              credit/debit card/ wallet /UPI/pay later
                              merchants. In the event the payment cannot be
                              accepted through non-cash/digital modes, you shall
                              be required to pay the trip charges by way of
                              Cash. The processing of payments or credits, as
                              applicable, in connection with your use of the
                              application and Service will be subject to the
                              terms, conditions and privacy policies of the
                              payment processor and your credit card issuer in
                              addition to these Standard Terms and Conditions.
                              The Company is not responsible for any errors by
                              the payment processor. In connection with your use
                              of the Service, the Company will obtain certain
                              transaction details, which Company will use solely
                              in accordance with its Privacy and Cookie Notice.
                            </p>
                            <p>
                              <b>4.Liability:</b>
                            </p>
                            <ul>
                              <li>
                                • The Company shall not be jointly or severally
                                held responsible or liable for any loss or
                                damage, howsoever caused or suffered by the
                                Customer arising out of the Use of Services
                                offered by the Company or due to the failure of
                                the Company to provide Services to the Customer
                                for any reason whatsoever including but not
                                limited to the Customer's non-compliance with
                                the Services' recorded voice instructions,
                                malfunction, partial or total failure of any
                                network terminal, data processing system,
                                computer tele-transmission or telecommunications
                                system or other circumstances whether or not
                                beyond the control of the Company or any person
                                or any organization involved in the above
                                mentioned systems.
                              </li>
                              <li>
                                • Without prejudice to the above, the Company
                                shall not be jointly and/or severally held
                                liable for any direct or indirect loss or damage
                                which may be suffered by the Customer as a
                                result of any failure by the Company to provide
                                a Cab to the Customer within any stipulated time
                                even if the Company has agreed to so provide the
                                Cab or even if the Customer has advised the
                                Company of the possibility that any such loss or
                                damage would result if the Cab is not provided
                                at all or within the stipulated time.
                              </li>
                              <li>
                                • In the event any Customer misses the train or
                                flight or bus, the Company will not be held
                                liable for any compensation and/or any direct or
                                indirect losses incurred by the Customer. The
                                Customer shall be responsible to make an
                                alternate arrangement if the Cab has not reached
                                the pick-up location due to any reason. The
                                Company shall not be responsible or liable for
                                any meeting or other occasions, functions missed
                                by the Customer.
                              </li>
                              <li>
                                • The Company shall not be liable for any delay
                                or failure in the performance of any of its
                                duties and obligations, to the extent that such
                                delay or failure is caused due to a Force
                                Majeure Event.
                              </li>
                              <li>
                                • The Company shall not be liable/responsible
                                for any illegal conduct of the Drivers of the
                                Cabs. However, the Company recommends you to
                                notify about any complaints that you may have
                                against the Drivers of any Cab.
                              </li>
                              <li>
                                • The Company shall not be responsible for any
                                loss of communication/information of status
                                update & benefits under any Services or program
                                of the Company. All this information will be
                                send on mobile number &/or email ID registered
                                with the Company. The Company will not be
                                responsible for appropriateness of mobile or
                                email or any other communication medium. The
                                Customer shall be responsible for immediately
                                reporting the errors, if any, occurred in the
                                information sent to the Customer regarding
                                booking confirmation.
                              </li>
                              <li>
                                • The Company does not warrant that this site,
                                its servers, or e-mail are free of viruses or
                                other harmful components. The Company will not
                                be liable for any damages of any kind arising
                                from the use of this site, including, but not
                                limited to direct, indirect, incidental,
                                punitive, and consequential damages.
                              </li>
                            </ul>
                            <p>
                              <b>
                                5.PROCEDURE FOR AVAILING THE SERVICES OF THE
                                COMPANY/BOOKING A CAB:
                              </b>
                            </p>
                            <ul>
                              <li>
                                • In order to avail the Services of the Company,
                                You shall be initially required to either log-in
                                through the official website of the Company; or
                                download and install the mobile application on
                                Anroid or any other smart phone; or dial the
                                dedicated number of the Company; or hail the Cab
                                from the street side or from the dedicated
                                pick-up location of the Company.
                              </li>
                              <li>
                                • Upon receiving Your request of the Cab, the
                                Company may accept or reject your booking
                                depending on the availability of the Cab.
                              </li>
                              <li>
                                {" "}
                                <li>
                                  • The Company shall be entitled at any time
                                  without giving any reason or prior notice to
                                  terminate or cancel Your booking.
                                </li>
                              </li>
                            </ul>
                            <p>
                              <b>6. OBLIGATIONS OF THE CUSTOMERS:</b>
                            </p>
                            <ul>
                              <li>
                                {" "}
                                • The Company encourages You to take full
                                responsibility of your items. In case of lost
                                items inside the Cabs during the journey, the
                                Company will try to locate the items on a
                                "best-effort" basis but the Company will not
                                responsible for the same in case of loss or
                                damage to the same.
                              </li>
                              <li>
                                • If You leave any goods in the Taxi or has any
                                complaint in respect of the Services or the use
                                of the Taxi, the Customer has to inform the
                                Company of the same in writing within 24 hours
                                of using the Cab or the Services of the Company.
                              </li>
                              <li>
                                • You agree and acknowledge that the use of the
                                services offered by the Company is at your sole
                                risk and that the Company disclaims all
                                representations and warranties of any kind,
                                whether express or implied as to condition,
                                suitability, quality, merchantability and
                                fitness for any purposes. Without prejudice to
                                the above, the Company makes no representation
                                or warranties that: -the service will meet your
                                requirements; -the service will be
                                uninterrupted, timely, secure, or error-free.
                              </li>
                              <li>
                                • You authorize the Company to send you various
                                communication including service messages,
                                offers, promotions, and other promotional
                                communication through various media channels,
                                such as calls, messages, e-mails, social media
                                and notifications in relation to the Company’s
                                services.
                              </li>
                            </ul>
                            <p>
                              <b>7.AREA OF OPERATION:</b>
                            </p>
                            <div>
                              The Taxi shall operate within the limits as
                              prescribed by the State Transport Authority and/or
                              as per the provision under the respective
                              Permits/Licenses.
                            </div>
                            <p>
                              <b>
                                8.INTELLECTUAL PROPERTY RIGHTS (Trademarks and
                                Copyrights)
                              </b>
                            </p>
                            <ul>
                              <li>
                                • The Company is the sole owner and lawful
                                licensee of all the rights to the web site and
                                its contents. Website content means its design,
                                layout, text, images, graphics, sounds, video,
                                etc. the website content embody trade secrets
                                and intellectual property rights protected under
                                worldwide copyright and other laws. All titles,
                                ownership and intellectual property rights in
                                the website and its content shall remain with
                                the Company, its affiliates, agents, authorized
                                representatives or licensor's as the case may
                                be.
                              </li>
                              <li>
                                • All rights not otherwise claimed under this
                                Terms and Conditions or by the Company are
                                hereby reserved. The information contained in
                                this web site is intended, solely to provide
                                general information for the personal use of the
                                reader, who accepts full responsibility for its
                                use.
                              </li>
                              <li>
                                • The Company does not represent or endorse the
                                accuracy or reliability of any information or
                                advertisement contained on, distributed through,
                                or linked, downloaded or accessed from any of
                                the services contained on this website, or the
                                quality of any products, information or other
                                materials displayed, or obtained by you as a
                                result of any product, information or other
                                materials displayed, or obtained by you as a
                                result of an advertisement or any other
                                information or offer in or in connection with
                                the service.
                              </li>
                              <li>
                                • All related icons and logos are registered
                                trademarks or service marks or word marks of the
                                Company in various jurisdictions and are
                                protected under applicable copyrights,
                                trademarks and other proprietary rights laws.
                                The unauthorized copying, modification, use or
                                publication of these marks is strictly
                                prohibited.
                              </li>
                              <li>
                                • All the contents on this web site is copyright
                                of the Company except the third party content
                                and link to third party website on our website.
                              </li>
                            </ul>
                            <p>
                              <b>9.MISCELLANEOUS</b>
                            </p>
                            <ul>
                              <li>
                                • The Courts of Mumbai, India shall have the
                                sole and exclusive jurisdiction in respect of
                                any matters arising from the Use of the Services
                                offered by the Company or the agreement or
                                arrangement between the You and the Company. All
                                claims and disputes arising under this Terms and
                                Conditions should be notified to the Company
                                within 30 days from the event date after which
                                You shall have no any claim against the Company.
                              </li>
                              <li>
                                • The Company shall be entitled to add to, vary
                                or amend any or all these terms and conditions
                                at any time and You shall be bound by such
                                addition, variation or amendment once such
                                addition, variation or amendment are
                                incorporated into these terms and conditions at
                                website at www.Goeasydocab.in or on the date
                                that the Company may indicate that such
                                addition, variation or amendment is to come into
                                effect.
                              </li>
                              <li>
                                • The Company reserves the right to publish
                                information of beneficiaries of any program,
                                offer, scheme or any promotion.
                              </li>
                              <li>
                                • The Company provides links to third party
                                website as a convenience to You or as an
                                advertisement and the Company does not have any
                                control over such sites i.e. content and
                                resources provided by them. The Company
                                recommends reading such site's terms and
                                conditions and/or privacy policies before using
                                such sites
                              </li>
                              <li>
                                • This web site (www.Goeasydocab.in) is
                                published and maintained by the Company access,
                                browsing or use of the facilities provided by
                                this site constitutes a deemed acceptance,
                                without limitation or qualification, of the
                                terms and conditions as set forth herein below,
                                by the user and constitutes an agreement between
                                Company and You.
                              </li>
                              <li>
                                • By using a cab operating on our network, You
                                agree not only to be bound by our Terms and
                                Conditions provided herein but also agree to be
                                bound by the
                                <a style={{ color: "blue" }}>
                                  {" "}
                                  Google Maps/Google Earth Additional Terms of
                                  Service (including the Google Privacy Policy).
                                </a>
                              </li>
                            </ul>
                            <p>
                              <b>10.Trip Tracker Service</b>
                            </p>
                            <ul>
                              <li>
                                • The Trip Tracker Service is optional & will be
                                provided based only on the information given by
                                You with regard to the tracking number while
                                making the booking of the Cab.
                              </li>
                              <li>
                                • The trip tracker service once activated shall
                                be ongoing unless otherwise deactivated by You.
                              </li>
                              <li>
                                • The Company assumes the deemed consent of the
                                owner of tracking number (to receive Trip
                                Tracker SMSs) & shall not be responsible or
                                liable for the authenticity of the tracking
                                number.
                              </li>
                              <li>
                                • In the event You desire to give any other
                                tracking number, the same shall be done by You
                                well in advance by intimating the Call Center or
                                by using the "edit" option given on the website
                                and in any case before the booking the Cab. The
                                SMS will be sent to the last tracking number
                                intimated to the Call Center or registered on
                                the website before the booking of the Cab.
                              </li>
                              <li>
                                • The service may not be available if any
                                routine maintenance is carried out for a short
                                period of time and the Customer will be informed
                                accordingly. Whilst every attempt will be made
                                to restore the trip tracking service, the
                                Company will not be responsible for any failure
                                or delay to offer the service due to routine
                                maintenance.
                              </li>
                              <li>
                                • In the event You wish to end his trip before
                                the drop destination provided by You at the time
                                of booking the cab, the trip tracking service
                                will send the SMS as showing that location as
                                end of trip where You has actually ended your
                                trip
                              </li>
                              <li>
                                • The Company will not be responsible for any
                                delay in or failure of message due to any
                                technical error or due to any delay on account
                                of service provided by the mobile service
                                provider of the Company or You and/or the person
                                whose number has been provided as tracking
                                number. Once the trip tracker SMS is sent from
                                the Company dispatch system, the same shall be
                                regarded as sent irrespective of any delay or
                                failure on account of any condition
                              </li>
                              <li>
                                • The Company will not be responsible for the
                                accuracy of the information, any situations like
                                congestion of network and/or traffic jams and in
                                no event the information sent by way of SMS
                                under the trip tracking service shall be used
                                for planning a meeting and/or any other purpose.
                                The Company shall not be responsible for any
                                delay on account of such situations and
                                information provided under the trip tracking
                                service is only for sending the SMS alerts about
                                the cab location and trip.
                              </li>
                              <li>
                                • The Company does not assure a complete
                                sustainability of this service either during
                                activated or deactivated mode & shall not be
                                held responsible or liable for the same, in any
                                manner.
                              </li>
                              <li>
                                • The Company shall not be responsible for the
                                correctness of the tracking number provided by
                                the Customers.
                              </li>
                            </ul>
                            <p>
                              <b>11.Share Your Ride</b>
                            </p>
                            <ul>
                              <li>
                                • You may offer to share the Cab with other
                                users on the application and You shall share
                                Your point of origin and destination for the
                                ride for the said purpose.
                              </li>
                              <li>
                                • Other users may place a request to You on the
                                Application by providing his point of origin and
                                destination for the desired ride.
                              </li>
                              <li>
                                • The application shall through technologically
                                automated means connect You and other users
                                having common or close points of origin and
                                destinations for a ride.
                              </li>
                              <li>
                                • The Company shall share your necessary details
                                with the other users and with the other party so
                                connected through the Application and the other
                                user shall have the option of accepting or
                                rejecting the offer placed by You for the ride
                                between the desired points of origin and
                                destination, until the Ride begins.
                              </li>
                              <li>
                                • You are advised to use Your own prudence in
                                offering or accepting a ride on the application
                                as the Company cannot guarantee the authenticity
                                of the data shared by other users.
                              </li>
                              <li>
                                • You are expected not to share Your personal
                                information with other users. You maintain
                                decorum and refrain from indulging in heated
                                discussions or debate(s) with other user.
                              </li>
                            </ul>
                          </div>
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TermsCondition;
