import ProfilePage from "../../../modules/profile";

export default function Profile() {
  return (
    <div id="profile-route">
      <ProfilePage
        name="John Doe"
        email="johndoe@mail.ugm.ac.id"
        role="Loading..."
      />
    </div>
  );
}
