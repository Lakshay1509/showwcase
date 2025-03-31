import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

import { Mail, MapPin, Info , Share2 } from "lucide-react"
import { FaHashtag } from "react-icons/fa"

interface UserProfileProps {
  user: {
    id: string
    name: string
    username: string
    email: string
    description: string | null
    location: string | null
    profileImageUrl: string | null
  },

  tags: Array<{id:number,name:string}> | []

}

export function UserProfile({ user,tags }: UserProfileProps) {
  return (
    <div className="flex">
      <Card className="w-full max-w-sm mx-0">
        <CardHeader className="flex flex-col items-center space-y-4 pb-2">
          <Avatar className="h-30 w-30 border-4 border-background">
            <AvatarImage src={user?.profileImageUrl || ""
} alt={user.name} />
            <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="text-center space-y-1  ">
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <div className="flex flex-row justify-center items-center space-x-2">
            <Badge variant="outline" className="px-3 py-1 flex justify-center items-center">
              
              {user.username}
            </Badge>
            <Share2 className="size-4"/>
            </div>
            

          </div>
         
        </CardHeader>

        <div className="flex flex-row flex-wrap justify-center space-x-4 space-y-3 p-3 min-h-[40px] w-full">
        {tags && tags.length > 0 ? (
          tags.map(tag => (
          <Badge variant="secondary" className="h-7  flex items-center justify-center" key={tag.id}>
            <FaHashtag className="h-2 w-2 mr-2" />
            {tag.name}
          </Badge>
          ))
        ) : (
          <div className="w-full"></div>
        )}
        </div>

        <CardContent className="space-y-4">
          
          <div className="space-y-3">
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2 " />
              <a href={`mailto:${user.email}`} className="hover:underline pl-2 text-sm">
              {user.email}
            </a>
            </div>
            
          </div>

          {user.location && (
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 " />
                <p className="text-sm pl-2 ">{user.location}</p>
              </div>
              
            </div>
          )}

          {user.description && (
            <>
              <Separator />
              <div className="space-y-3">
                <div className="flex items-center">
                  <Info className="h-4 w-4 mr-2 text-primary" />
                  <p className="text-sm font-medium">About</p>
                </div>
                <p className="text-sm text-muted-foreground pl-6">{user.description}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
      <div className="flex-1"></div>

      {/* <AddTech/> */}
    
    </div>
  )
}

