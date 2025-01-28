// "use client"

// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { z } from "zod"

// import { Button } from "@/components/ui/button"
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import { cn } from "@/lib/utils"
// import { useState } from "react"
// import { Textarea } from "@/components/ui/textarea"
// import GeneratePodcast from "@/components/GeneratePodcast"
// import GenerateThumbnail from "@/components/GenerateThumbnail"
// import { Loader } from "lucide-react"
// import { Id } from "@/convex/_generated/dataModel"
// import { useToast } from "@/components/ui/use-toast"
// import { useMutation } from "convex/react"
// import { api } from "@/convex/_generated/api"
// import { useRouter } from "next/navigation"
// import { v4 as uuidv4 } from "uuid";

// const voiceCategories = ['alloy', 'shimmer', 'nova', 'echo', 'fable', 'onyx'];

// const formSchema = z.object({
//   podcastTitle: z.string().min(2),
//   podcastDescription: z.string().min(2),
// })

// const CreatePodcast = () => {
//   const router = useRouter()
//   const [imagePrompt, setImagePrompt] = useState('');
//   const [imageStorageId, setImageStorageId] = useState<Id<"_storage"> | null>(null)
//   const [imageUrl, setImageUrl] = useState('');
  
//   const [audioUrl, setAudioUrl] = useState('');
//   const [audioStorageId, setAudioStorageId] = useState<Id<"_storage"> | null>(null)
//   const [audioDuration, setAudioDuration] = useState(0);
  
//   const [voiceType, setVoiceType] = useState<string | null>(null);
//   const [voicePrompt, setVoicePrompt] = useState('');
  
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [podcasts, setPodcasts] = useState<
//     Array<{ id: string; title: string; description: string; audio: string; image: string }>
//   >([]);

//   const createPodcast = useMutation(api.podcasts.createPodcast)

//   const { toast } = useToast()
//   // 1. Define your form.
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       podcastTitle: "",
//       podcastDescription: "",
//     },
//   })
 
//   async function onSubmit(data: z.infer<typeof formSchema>) {
//     try {
//       setIsSubmitting(true);
//       if(!audioUrl || !imageUrl || !voiceType) {
//         toast({
//           title: 'Please generate audio and image',
//         })
//         setIsSubmitting(false);
//         throw new Error('Please generate audio and image')
//       }

//       const podcast = await createPodcast({
//         podcastTitle: data.podcastTitle,
//         podcastDescription: data.podcastDescription,
//         audioUrl,
//         imageUrl,
//         voiceType,
//         imagePrompt,
//         voicePrompt,
//         views: 0,
//         audioDuration,
//         audioStorageId: audioStorageId!,
//         imageStorageId: imageStorageId!,
//       })

//       setPodcasts((prev) => [
//         ...prev,
//         {
//           id: uuidv4(),
//           title: data.podcastTitle,
//           description: data.podcastDescription,
//           audio: audioUrl,
//           image: imageUrl,
//         },
//       ]);

      
//       toast({ title: 'Podcast created' })
//       setIsSubmitting(false);
//       router.push('/')
//     } catch (error) {
//       console.log(error);
//       toast({
//         title: 'Error',
//         variant: 'destructive',
//       })
//       setIsSubmitting(false);
//     }
//   }

//   return (
//     <section className="mt-10 flex flex-col">
//       <h1 className="text-20 font-bold text-white-1">Create Podcast</h1>

//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="mt-12 flex w-full flex-col">
//           <div className="flex flex-col gap-[30px] border-b border-black-5 pb-10">
//             <FormField
//               control={form.control}
//               name="podcastTitle"
//               render={({ field }) => (
//                 <FormItem className="flex flex-col gap-2.5">
//                   <FormLabel className="text-16 font-bold text-white-1">Title</FormLabel>
//                   <FormControl>
//                     <Input className="input-class focus-visible:ring-offset-orange-1" placeholder="Podcast Title" {...field} />
//                   </FormControl>
//                   <FormMessage className="text-white-1" />
//                 </FormItem>
//               )}
//             />

//             <div className="flex flex-col gap-2.5">
//               <Label className="text-16 font-bold text-white-1">
//                 Select AI Voice
//               </Label>

//               <Select onValueChange={(value) => setVoiceType(value)}>
//                 <SelectTrigger className={cn('text-16 w-full border-none bg-black-1 text-gray-1 focus-visible:ring-offset-orange-1')}>
//                   <SelectValue placeholder="Select AI Voice" className="placeholder:text-gray-1 " />
//                 </SelectTrigger>
//                 <SelectContent className="text-16 border-none bg-black-1 font-bold text-white-1 focus:ring-orange-1">
//                   {voiceCategories.map((category) => (
//                     <SelectItem key={category} value={category} className="capitalize focus:bg-orange-1">
//                       {category}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//                 {voiceType && (
//                   <audio 
//                     src={`/${voiceType}.mp3`}
//                     autoPlay
//                     className="hidden"
//                   />
//                 )}
//               </Select>
//             </div>

//             <FormField
//               control={form.control}
//               name="podcastDescription"
//               render={({ field }) => (
//                 <FormItem className="flex flex-col gap-2.5">
//                   <FormLabel className="text-16 font-bold text-white-1">Description</FormLabel>
//                   <FormControl>
//                     <Textarea className="input-class focus-visible:ring-offset-orange-1" placeholder="Podcast Description" {...field} />
//                   </FormControl>
//                   <FormMessage className="text-white-1" />
//                 </FormItem>
//               )}
//             />
//           </div>
//           <div className="flex flex-col pt-10">
//               <GeneratePodcast 
//                 setAudioStorageId={setAudioStorageId}
//                 setAudio={setAudioUrl}
//                 voiceType={voiceType!}
//                 audio={audioUrl}
//                 voicePrompt={voicePrompt}
//                 setVoicePrompt={setVoicePrompt}
//                 setAudioDuration={setAudioDuration}
//               />

//               <GenerateThumbnail 
//                setImage={setImageUrl}
//                setImageStorageId={setImageStorageId}
//                image={imageUrl}
//                imagePrompt={imagePrompt}
//                setImagePrompt={setImagePrompt}
//               />

//               <div className="mt-10 w-full">
//                 <Button type="submit" className="text-16 w-full bg-orange-1 py-4 font-extrabold text-white-1 transition-all duration-500 hover:bg-black-1">
//                   {isSubmitting ? (
//                     <>
//                       Submitting
//                       <Loader size={20} className="animate-spin ml-2" />
//                     </>
//                   ) : (
//                     'Submit & Publish Podcast'
//                   )}
//                 </Button>
//               </div>
//               <div className="mt-8 w-full max-w-4xl">
//         <h2 className="text-2xl font-bold">Published Podcasts</h2>
//         <div className="flex flex-wrap gap-4 mt-4">
//           {podcasts.map((podcast) => (
//             <div
//               key={podcast.id}
//               className="flex flex-col items-center gap-2 border p-4 rounded shadow w-full max-w-sm"
//             >
//               <img
//                 src={podcast.image}
//                 alt={`Podcast ${podcast.title}`}
//                 className="w-40 h-40 object-cover rounded"
//               />
//               <h3 className="text-lg font-bold">{podcast.title}</h3>
//               <p className="text-sm text-gray-600">{podcast.description}</p>
//               <audio controls src={podcast.audio} className="w-full mt-2" />
//             </div>
//           ))}
//         </div>
//       </div>
//           </div>
//         </form>
//       </Form>
//     </section>
//   )
// }

// export default CreatePodcast

//new code

"use client"
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

const PublishPodcast = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [podcasts, setPodcasts] = useState<
    Array<{ id: string; title: string; description: string; audio: string; image: string }>
  >([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      setAudioFile(file);
    } else {
      alert('Please upload a valid audio file.');
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
    } else {
      alert('Please upload a valid image file.');
    }
  };

  const handleSubmit = async () => {
    if (!title || !description || !audioFile || !imageFile) {
      alert('Please fill out all fields and upload audio and image files.');
      return;
    }

    try {
      setIsSubmitting(true);

      // Generate URLs for the uploaded files
      const audioUrl = URL.createObjectURL(audioFile);
      const imageUrl = URL.createObjectURL(imageFile);

      // Add the new podcast to the list
      const newPodcast = {
        id: uuidv4(),
        title,
        description,
        audio: audioUrl,
        image: imageUrl,
      };
      setPodcasts((prev) => [...prev, newPodcast]);

      // Reset the form fields
      setTitle('');
      setDescription('');
      setAudioFile(null);
      setImageFile(null);
      alert('Podcast submitted successfully!');
    } catch (error) {
      console.error('Error submitting podcast:', error);
      alert('Failed to submit podcast. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-full max-w-md">
        <div className="mb-4">
          <Label className="text-lg text-orange-1 font-bold">Podcast Title</Label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter podcast title"
            className="mt-2 w-full"
          />
        </div>

        <div className="mb-4">
          <Label className="text-lg text-orange-1 font-bold">Podcast Description</Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter podcast description"
            rows={4}
            className="mt-2 w-full"
          />
        </div>

        <div className="mb-4">
          <Label className="text-lg text-orange-1 font-bold">Upload Audio File</Label>
          <input
            type="file"
            accept="audio/*"
            onChange={handleAudioUpload}
            className="file-input mt-2"
          />
        </div>

        <div className="mb-4">
          <Label className="text-lg text-orange-1 font-bold">Upload Image File</Label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="file-input mt-2"
          />
        </div>

        <Button
          className="mt-4 bg-orange-500 text-white px-4 py-2 rounded w-full"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              Submitting
              <Loader size={20} className="animate-spin ml-2" />
            </>
          ) : (
            'Submit and Publish Podcast'
          )}
        </Button>
      </div>

      <div className="mt-8 w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-orange-1">Published Podcasts</h2>
        <div className="flex flex-wrap gap-4 mt-4">
          {podcasts.map((podcast) => (
            <div
              key={podcast.id}
              className="flex flex-col items-center gap-2 border p-4 rounded shadow w-full max-w-sm"
            >
              <img
                src={podcast.image}
                alt={`Podcast ${podcast.title}`}
                className="w-40 h-40 object-cover rounded"
              />
              <h3 className="text-lg font-bold">{podcast.title}</h3>
              <p className="text-sm text-gray-600">{podcast.description}</p>
              <audio controls src={podcast.audio} className="w-full mt-2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PublishPodcast;

