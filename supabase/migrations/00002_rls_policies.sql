-- Enable Row Level Security on your tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

-- Create helper functions to read JWT claims injected during authentication
CREATE OR REPLACE FUNCTION auth.jwt_tenant_id() 
RETURNS UUID AS $$
    SELECT NULLIF(current_setting('request.jwt.claims', true)::json->'app_metadata'->>'tenant_id', '')::uuid;
$$ LANGUAGE sql STABLE;

CREATE OR REPLACE FUNCTION auth.jwt_user_role() 
RETURNS TEXT AS $$
    SELECT current_setting('request.jwt.claims', true)::json->'app_metadata'->>'role';
$$ LANGUAGE sql STABLE;

-- Apply Tenant Isolation Policy (User can only read/write their school's data)
CREATE POLICY tenant_isolation_policy ON public.students
    FOR ALL
    USING (tenant_id = auth.jwt_tenant_id());

-- Apply Admin Policy (School admins get full control over their school's students)
CREATE POLICY admin_full_access_policy ON public.students
    FOR ALL
    USING (
        tenant_id = auth.jwt_tenant_id() 
        AND auth.jwt_user_role() = 'SCHOOL_ADMIN'
    );

-- Apply Teacher Policy (Teachers can view all students in their school)
CREATE POLICY teacher_read_policy ON public.students
    FOR SELECT
    USING (
        tenant_id = auth.jwt_tenant_id() 
        AND auth.jwt_user_role() = 'TEACHER'
    );