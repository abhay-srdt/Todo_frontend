import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getProfile, updateProfile, uploadAvatar } from "../services/profileService"
import { profileKeys } from "../features/profile/profileQueries"
import Avatar from "../components/Avatar"

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"]
const MAX_SIZE = 2 * 1024 * 1024 // 2 MB

function ProfileContent({ profile }) {
  const queryClient = useQueryClient()

  const [form, setForm] = useState({
    displayName: profile.displayName || "",
    bio: profile.bio || "",
    phone: profile.phone || "",
  })
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [fileError, setFileError] = useState("")

  // Create a preview URL for the chosen file, and free it when it changes
  useEffect(() => {
    if (!file) {
      setPreview(null)
      return
    }
    const url = URL.createObjectURL(file)
    setPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [file])

  const updateMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.me() })
    },
  })

  const avatarMutation = useMutation({
    mutationFn: uploadAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.me() })
      setFile(null)
    },
  })

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    updateMutation.mutate(form)
  }

  function handleFileChange(e) {
    const chosen = e.target.files[0]
    setFileError("")
    avatarMutation.reset()
    if (!chosen) return

    if (!ALLOWED_TYPES.includes(chosen.type)) {
      setFileError("Only JPG, PNG or WEBP images are allowed.")
      setFile(null)
      return
    }
    if (chosen.size > MAX_SIZE) {
      setFileError("Image must be 2 MB or smaller.")
      setFile(null)
      return
    }
    setFile(chosen)
  }

  return (
    <div className="space-y-6">
      {/* Avatar section */}
      <section className="rounded-xl bg-white p-6 shadow-sm">
        <div className="flex items-center gap-6">
          <Avatar
            name={profile.displayName}
            url={preview || profile.avatarUrl}
            size="h-24 w-24"
            textSize="text-3xl"
          />
          <div className="space-y-2">
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              className="block text-sm"
            />
            {fileError && <p className="text-sm text-red-600">{fileError}</p>}
            {avatarMutation.isError && (
              <p className="text-sm text-red-600">{avatarMutation.error.message}</p>
            )}
            {avatarMutation.isSuccess && (
              <p className="text-sm text-green-600">Photo updated.</p>
            )}
            {file && (
              <div className="flex gap-2">
                <button
                  onClick={() => avatarMutation.mutate(file)}
                  disabled={avatarMutation.isPending}
                  className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white disabled:opacity-50"
                >
                  {avatarMutation.isPending ? "Uploading..." : "Upload photo"}
                </button>
                <button
                  onClick={() => setFile(null)}
                  disabled={avatarMutation.isPending}
                  className="rounded-lg bg-gray-600 px-3 py-2 text-sm text-white disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Details form */}
      <form onSubmit={handleSubmit} className="space-y-4 rounded-xl bg-white p-6 shadow-sm">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
          <input
            value={profile.email}
            disabled
            className="w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-gray-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Display name</label>
          <input
            name="displayName"
            value={form.displayName}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Phone</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Bio</label>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>

        {updateMutation.isError && (
          <p className="text-sm text-red-600">{updateMutation.error.message}</p>
        )}
        {updateMutation.isSuccess && (
          <p className="text-sm text-green-600">Profile saved.</p>
        )}

        <button
          type="submit"
          disabled={updateMutation.isPending}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
        >
          {updateMutation.isPending ? "Saving..." : "Save changes"}
        </button>
      </form>
    </div>
  )
}

function Profile() {
  const {
    data: profile,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: profileKeys.me(),
    queryFn: getProfile,
  })

  return (
    <main className="min-h-screen bg-gray-100 py-10">
      <div className="mx-auto max-w-2xl px-4">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <Link to="/todos" className="text-blue-600 hover:underline">
            ← Back to todos
          </Link>
        </div>

        {isLoading && <p className="py-4 text-center text-gray-500">Loading profile...</p>}

        {isError && (
          <div className="py-4 text-center">
            <p className="text-red-600">{error.message}</p>
            <button
              onClick={() => refetch()}
              className="mt-2 rounded-lg bg-gray-600 px-3 py-2 text-sm text-white"
            >
              Retry
            </button>
          </div>
        )}

        {profile && <ProfileContent profile={profile} />}
      </div>
    </main>
  )
}

export default Profile