import BlurFade from "@/components/magicui/blur-fade";
import { allPosts } from "content-collections";
import Link from "next/link";
import type { Metadata } from "next";
import { paginate, normalizePage } from "@/lib/pagination";
import { ChevronRight } from "lucide-react";
import { Suspense, use } from "react"; 

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Blog",
  description: "Coming soon",
};

const PAGE_SIZE = 5;
const BLUR_FADE_DELAY = 0.04;

export default function BlogPage(props: {
  searchParams: Promise<{ page?: string }>;
}) {
  return (
    <section id="blog">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="text-2xl font-semibold tracking-tight mb-2">
          Blog{" "}
          <span className="ml-1 bg-card border border-border rounded-md px-2 py-1 text-muted-foreground text-sm">
            {allPosts.length} posts
          </span>
        </h1>
        <p className="text-sm text-muted-foreground mb-8">Coming soon</p>
      </BlurFade>

      <Suspense fallback={<div className="text-sm text-muted-foreground">Loading posts...</div>}>
        <BlogContent searchParams={props.searchParams} />
      </Suspense>
    </section>
  );
}

async function BlogContent({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;

  const sortedPosts = [...allPosts].sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const totalPages = Math.ceil(sortedPosts.length / PAGE_SIZE);
  const currentPage = normalizePage(pageParam, totalPages);
  const { items: paginatedPosts, pagination } = paginate(sortedPosts, {
    page: currentPage,
    pageSize: PAGE_SIZE,
  });

  if (paginatedPosts.length === 0) {
    return (
      <div className="py-12 border border-border rounded-xl text-center text-muted-foreground">
        No blog posts yet.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {paginatedPosts.map((post, id) => {
        const slug = post._meta.path.replace(/\.mdx$/, "");
        const indexNumber = (pagination.page - 1) * PAGE_SIZE + id + 1;
        return (
          <BlurFade delay={BLUR_FADE_DELAY * 3 + id * 0.05} key={slug}>
            <Link className="flex items-start gap-x-2 group" href={`/blog/${slug}`}>
              <span className="text-xs font-mono mt-[5px]">
                {String(indexNumber).padStart(2, "0")}.
              </span>
              <div className="flex flex-col gap-y-2 flex-1">
                <p className="text-lg font-medium group-hover:text-primary transition-colors">
                  {post.title}
                  <ChevronRight className="ml-1 inline-block size-4" />
                </p>
                <p className="text-xs text-muted-foreground">{post.publishedAt}</p>
              </div>
            </Link>
          </BlurFade>
        );
      })}

      {/* Pagination Controls */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-between items-center mt-8">
          <span className="text-sm text-muted-foreground">Page {pagination.page} of {pagination.totalPages}</span>
          <div className="flex gap-2">
            {pagination.hasPreviousPage ? (
              <Link href={`/blog?page=${pagination.page - 1}`} className="px-2 py-1 border rounded hover:bg-accent">Previous</Link>
            ) : <span className="px-2 py-1 border rounded opacity-50">Previous</span>}
            {pagination.hasNextPage ? (
              <Link href={`/blog?page=${pagination.page + 1}`} className="px-2 py-1 border rounded hover:bg-accent">Next</Link>
            ) : <span className="px-2 py-1 border rounded opacity-50">Next</span>}
          </div>
        </div>
      )}
    </div>
  );
}

