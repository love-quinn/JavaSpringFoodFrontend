import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNotify } from "@/hooks/use-notify";
import { useFoodDataMutate } from "@/hooks/useFoodDataMutate";

const productSchema = z.object({
  title: z.string().min(1).max(120),
  image: z.string().min(1).max(240),
  price: z
    .string()
    .min(1, "Price is required") // Check for non-empty input
    .transform((val) => Number(val)) // Convert to number
    .refine((val) => !isNaN(val) && val >= 0, {
      message: "Price must be a valid number and cannot be negative",
    }),
});

type ProductSchema = z.infer<typeof productSchema>;

const AddProductSheet = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notify } = useNotify();
  const { mutate, isSuccess, isPending } = useFoodDataMutate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
  });

  function handleProductAdd(data: ProductSchema) {
    mutate(data);
  }

  useEffect(() => {
    if (!isSuccess) {
      // setIsOpen(false);
      // notify("error", "Fail to add product");
      return;
    }
    setIsOpen(false);
    notify("success", "Product added successfully");
  }, [isSuccess]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          className="p-3"
          variant={"outline"}
          onClick={() => setIsOpen(true)}
        >
          <Plus />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add Product</SheetTitle>
          <SheetDescription>
            Add new products to the menu here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <form
          onSubmit={handleSubmit(handleProductAdd)}
          className="flex flex-col gap-3 mt-5"
        >
          <div>
            <Input placeholder="Product Title" {...register("title")} />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <Input placeholder="Image URL" {...register("image")} />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">
                {errors.image.message}
              </p>
            )}
          </div>

          <div>
            <Input placeholder="Product Price" {...register("price")} />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>
          <Button type="submit">
            {isPending ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <p>Save</p>
            )}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default AddProductSheet;
