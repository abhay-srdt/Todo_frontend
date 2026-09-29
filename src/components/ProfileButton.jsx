import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getProfile } from "../services/profileService"
import { profileKeys } from "../features/profile/profileQueries"
import Avatar from "./Avatar"

function ProfileButton({ name }) {
  // Same key as the Profile page, so both share one cache box.
  const { data } = useQuery({
    queryKey: profileKeys.me(),
    queryFn: getProfile,
    retry: false,
  })

  return (
    <Link to="/profile" title="My profile">
      <Avatar name={data?.displayName || name} url={data?.avatarUrl} />
    </Link>
  )
}

export default ProfileButton